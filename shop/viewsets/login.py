from customers.models import Customer
from experts.models import Expert
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from experts.serializers import ExpertSerializer
from customers.serializers import CustomerSerializer
from rest_framework.authtoken.models import Token

class TengenetsarLoginView(APIView):
    def post(self, request,format=None):
        email = request.data.get('email')
        password=request.data.get('password')

        user=User.objects.filter(email=email,password=password).first()
        
        tengenetsar_user=None
        serializer=None

        customer=Customer.objects.filter(user=user).first()
        expert=Expert.objects.filter(user=user).first()
        
        if expert:
            tengenetsar_user=expert
            serializer = ExpertSerializer(expert)
        elif customer:
            tengenetsar_user=customer
            serializer = CustomerSerializer(customer)

        else:
            return Response({'success':False})
        
        if tengenetsar_user:
            token,created = Token.objects.get_or_create(user=user)
            tengenetsar_user.gcm_token = request.data.get('gcm_token')
            tengenetsar_user.save()
            return Response({'token':token.key,'success':True,'user':serializer.data})
        else:
            return Response({'success':False})
            
