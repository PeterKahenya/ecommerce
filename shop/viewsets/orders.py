from shop.models import *
from shop.serializers.orders import *
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class ShippingAddressView(APIView):

    """
    
    Get shipping addresses and Create a shipping address
    
    """

    def get(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        addresses = ShippingAddress.objects.filter(order=cart)
        serializer = ShippingAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ShippingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckoutView(APIView):
    
    """
        
        List all products, or create a new product.
    
    """

    def get(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        serializer = OrderSerializer(cart)
        return Response(serializer.data)

    def post(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        shipping_address = ShippingAddress.objects.get(id=request.data.get("shipping_address"))
        payment = MPESAPayment.objects.get(id=request.data.get("mpesa_payment_id"))
        
        delivery=Delivery(address=shipping_address,mpesa_payment=payment)
        delivery.save()
        cart.completed=True
        cart.save()
        # send receipts and lpos
        serializer = DeliverySerializer(delivery)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartView(APIView):
    """

        Adding an item to cart or removing or changing the quantity

    """
    
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        serializer = OrderSerializer(cart)
        return Response(serializer.data)

    def post(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        action = request.data.get("action")

        if action == "add":
            product_id = request.data.get("product_id")
            product = Product.objects.get(pk=product_id)
            order_item = cart.get_or_create_order_item(product=product)

        if action == "update_item":
            order_item_id = request.data.get("order_item_id")
            updated_quantity = request.data.get("updated_quantity")
            order_item=OrderItem.objects.get(id=order_item_id)
            order_item=cart.update_quantity(order_item,updated_quantity)

        serializer = OrderSerializer(cart)
        return Response(serializer.data)