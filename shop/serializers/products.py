from rest_framework import serializers
from ..models import Category,Supplier,Tag,Product,ProductDetail,DetailName

class ProductSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = Product
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class DetailNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailName
        fields = '__all__'
        
        
class ProductDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductDetail
        fields = '__all__'
