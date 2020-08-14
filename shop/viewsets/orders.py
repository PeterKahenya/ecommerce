from shop.models import *
from shop.serializers.orders import *
from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..generate_docs import generate_and_send

class ShippingAddressView(APIView):

    """
    
    Get shipping addresses and Create a shipping address
    
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        addresses = ShippingAddress.objects.filter(owner=request.user)
        serializer = ShippingAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data)
        address = ShippingAddress()

        address.owner = request.user
        address.full_name = request.data.get("full_name")
        address.phone = request.data.get("phone")
        address.county = request.data.get("county")
        address.city = request.data.get("city")
        address.longitude = request.data.get("longitude")
        address.latitude = request.data.get("latitude")
        address.save()

        serializer = ShippingAddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CheckoutView(APIView):
    
    """
        
        List all products, or create a new product.
    
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        serializer = OrderSerializer(cart)
        return Response(serializer.data)

    def post(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)


        print(request.COOKIES)
        shipping_address = ShippingAddress.objects.get(id=request.data.get("shipping_address_id"))
        shipping_address.order=cart
        shipping_address.save()

        payment = MPESAPayment.objects.get(id=request.data.get("mpesa_payment_id"))
        
        delivery=Delivery(address=shipping_address,mpesa_payment=payment)
        delivery.save()
        cart.completed=True
        cart.save()

        status = generate_and_send(shipping_address,payment)
        print(status)
        serializer = DeliverySerializer(delivery)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartView(APIView):
    """

        Adding an item to cart or removing or changing the quantity

    """
    
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        serializer = OrderSerializer(cart)
        return Response(serializer.data)

    def post(self, request, format=None):
        cart,created = Order.objects.get_or_create(added_by=request.user)
        print(request.data)
        # product_id = request.data.get("product").get("id")
        # product = Product.objects.get(pk=product_id)
        # order_item = cart.get_or_create_order_item(product=product)
        # updated_quantity = request.data.get("quantity")
        # order_item=cart.update_quantity(order_item,updated_quantity)
        serializer = OrderSerializer(cart)
        return Response(serializer.data)