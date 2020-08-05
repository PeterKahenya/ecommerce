from rest_framework import serializers
from ..models import Product,ProductDetail

class ProductSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = Product
        fields = ['url','id','serial_no','name','category','image', 'description', 'price', 'supplier','tags','created_at','updated_at']


class ProductDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ['url','id','product','detail_name','value','created_at','updated_at']