from shop.serializers.products import MPESASerializer


class AddMPESAPaymentView(APIView):
    def post(self, request, format=None):
        serializer = MPESASerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CheckMPESAPaymentView(APIView):
    def post(self, request, format=None):
        serializer = MPESASerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
