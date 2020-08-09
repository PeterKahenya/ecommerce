from django.shortcuts import render
from rest_framework.views import APIView
from .models import Call
from django.db.models import Q
from .serializers import CallSerializer,ChatSerializer

# Create your views here.
class APICallHistory(APIView):
	def get(self,request,format=None):
		if self.request.is_authenticated:
			calls=Call.objects.filter(Q(caller=request.user)||Q(callee=request.user))
			cs=CallSerializer(calls,many=True)
			return Response(cs.data)
		else:
			return Response({"message":"You are not authenicated"})

class APIChatList(APIView):
	def get(self,request,format=None):
		if self.request.is_authenticated:
			calls=Call.objects.filter(Q(caller=request.user)||Q(callee=request.user))
			cs=CallSerializer(calls,many=True)
			return Response(cs.data)
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
		return render(request,"index.html",{'call':call,'utype':'caller'},None,None,None)

	def answer(self,request,call):
		call.callee_accepted = True
		call.save()
		return render(request,"index.html",{'call':call,'utype':'callee'},None,None,None)

		
	
	def get(self,request):
		room_id = request.GET.get("room")
		print(room_id)
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