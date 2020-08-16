from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from shop.serializers.mpesa import MPESAPaymentSerializer
from shop.models import MPESAPayment,Delivery
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class AddMPESAPaymentView(APIView):
    def post(self, request, format=None):
        serializer = MPESASerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CheckMPESAPaymentView(APIView):

    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        print(request.data)
        payment=MPESAPayment.objects.filter(code=request.data.get("code")).first()
        print("payment"+str(payment))
        if payment and not Delivery.objects.filter(mpesa_payment=payment).first():
            print(payment)
            serializer = MPESAPaymentSerializer(payment)
            return Response(serializer.data)
        return Response({"NF":True,"message":"No such payment. Please check the code and try again!"})
