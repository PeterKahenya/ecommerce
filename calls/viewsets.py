from django.shortcuts import render
from rest_framework.views import APIView
from .models import Call,Chat
from django.db.models import Q
from .serializers import CallSerializer,ChatSerializer
from customers.models import Customer
from experts.models import Expert
from rest_framework.response import Response
import json
import requests



def sendPush(to,roomId):
	print(to,roomId)
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
		if self.request.auth:
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

	def start_call(self,call,receiver):
		sendPush(receiver.gcm_token,call.room)
		serializer = CallSerializer(call)
		return Response({'call':serializer.data,'utype':'caller',"status":"success"})


	def answer(self,request,call):
		return JsonResponse({"call_initiated":True,"status":"success"})
		

	def post(self,request,format=None):
		room_id = request.data.get("room")
		receiver_id = request.data.get("receiver").get("id")
		receiver = None

		if Expert.objects.get(id=receiver_id):
			receiver = Expert.objects.get(id=receiver_id)
		else:
			receiver = Customer.objects.get(id=receiver_id)

		if room_id:
			utype = request.data.get("utype")
			if utype == "caller":
				call= Call()
				call.room=room_id
				call.caller=request.user
				call.callee=receiver.user
				call.save()
				return self.start_call(call,receiver)
			elif utype == "callee":
				call = Call.objects.filter(room=room_id,callee_accepted=False).first()
				call.callee_accepted = True
				call.save()
				return self.answer(request,call)
			else:
				"""
					utype is not recognized
				"""
				return Response({"message":"utype is not recognized"})
		else:
			"""Room ID not specified"""
			print("Room ID not specified")
			return Response({"message":"Room ID not specified"})