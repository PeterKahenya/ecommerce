from rest_framework import serializers
from ..models import OrderItem,Order,ShippingAddress,Delivery


class OrderItemSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = OrderItem
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = Order
        fields = '__all__'
        
        
 class ShippingAddressSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = ShippingAddress
        fields = '__all__'
        
class DeliverySerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = Delivery
        fields = '__all__'
