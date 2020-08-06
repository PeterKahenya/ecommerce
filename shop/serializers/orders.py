from rest_framework import serializers
from ..models import OrderItem,Order,ShippingAddress,Delivery


class ProductSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = Product
        fields = '__all__'
class ProductSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = Product
        fields = '__all__'
