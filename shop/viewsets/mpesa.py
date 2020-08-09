from shop.serializers.mpesa import MPESAPaymentSerializer
from shop.models import MPESAPayment,Delivery


class AddMPESAPaymentView(APIView):
    def post(self, request, format=None):
        serializer = MPESASerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CheckMPESAPaymentView(APIView):
    def post(self, request, format=None):
        payment=MPESAPayment.objects.get(code=request.data.get("code")).first()
        if payment and not Delivery.objects.filter(mpesa_payment=payment).first():
            serializer = MPESASerializer(payment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
