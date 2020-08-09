from django.shortcuts import render
from rest_framework.views import APIView
from .models import Call,Chat
from django.db.models import Q
from .serializers import CallSerializer,ChatSerializer
from customers.models import Customer

import requests


def sendPush(to,roomId):
    url = 'https://fcm.googleapis.com/fcm/send'
    json_data = {
        "to": to,
        "data":{
            "title":"Tengeneza Call Request",
            "room_id":roomId,
        },
    }
    headers = {
        "Authorization":"key=AAAAOGOy1tc:APA91bH41zurNt10opqsUz66eNl79KlHgXDNDyiZ4Hzm7pwpmdvk2xz2tHjzQWQ4mPqeEDzldQkjVRJT8IR7eM-y8TNgrgTLMvbl4kTj92AP0Tnq0BF1xQbDuVaXrdqkwyiBHdQBfDjT",
        "Content-Type":"application/json"
    }

    x = requests.post(url, json = json_data, headers=headers)
    
# Create your views here.
class APICallHistory(APIView):
	def get(self,request,format=None):
		if self.request.is_authenticated:
			calls=Call.objects.filter(Q(caller=request.user)|Q(callee=request.user))
			serializer=CallSerializer(calls,many=True)
			return Response(serializer.data)
		else:
			return Response({"message":"You are not authenicated"})

class APIChatList(APIView):
	def get(self,request,format=None):
		if self.request.is_authenticated:
			receiver=User.objects.get(id=request.data.get("call_id"))
			chats=Chat.objects.filter(Q(sender=request.user) and Q(receiver=receiver))
			serializer=ChatSerializer(calls,many=True)
			return Response(serializer.data)
		else:
			return Response({"message":"You are not authenicated"})
	
	def post(self,request,format=None):
		serializer=ChatSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class APICallView(APIView):

	"""
		This is the callview. This view renders the call page by extracting the room from the ?callID= field of the url
		The call then uses the room as the document id for the webrtc firebase app rendered
	"""

	def start_call(self,request,call):
		return Response({'call':call,'utype':'caller'})

	def answer(self,request,call):
		call.callee_accepted = True
		call.save()

		#send the fcm
		data=json.loads(request.body.decode('utf-8'))
		room_id=request.data.get("room_id")
		expert=Expert.objects.get(id=data["receiver_id"])
		if expert:
			sendPush(expert.gcm_token,room_id)
			return JsonResponse({"call_initiated":True})
		else:
			customer=Customer.objects.get(id=data["receiver_id"])
			if customer:
				sendPush(customer.gcm_token,room_id)
				return JsonResponse({"call_initiated":True})
			else:		
				return JsonResponse({"call_initiated":False})
		
		return render(request,"index.html",{'call':call,'utype':'callee'},None,None,None)

		
	
	def get(self,request):
		room_id = request.GET.get("room")
		if room_id:
			call= Call()
			call.room=room_id
			call.save()
			utype = request.GET.get("utype")
			if utype == "caller":
				return self.start_call(request,call)
			elif utype == "callee":
				return self.answer(request,call)
			else:
				"""utype is not recognized"""
				print("utype is not recognized")
				return HttpResponseNotFound("utype is not recognized")
		else:
			"""Room ID not specified"""
			print("Room ID not specified")
			return HttpResponseNotFound("Room ID not specified")