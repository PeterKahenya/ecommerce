from rest_framework import serializers
from .orders import OrderItemSerializer
from ..models import Category,Supplier,Tag,Product,ProductDetail,DetailName,Review

class ProductSerializer(serializers.ModelSerializer):
    product_details = ProductDetailSerializer(many=True, read_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['product_details','reviews','order_items','id','serial_no','name','category','image','description','price','supplier','tags','created_at','updated_at']
        
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ['id','name','products']

class SupplierSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Supplier
        fields = ['id','products','title','image','created_at','updated_at']
        

class TagSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Tag
        fields = ['id','products','title','created_at','updated_at']
        

class DetailNameSerializer(serializers.ModelSerializer):
    details = ProductDetailSerializer(many=True, read_only=True)
    
    class Meta:
        model = DetailName
        fields = ['id','name','details','created_at','updated_at']
        
class ProductDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductDetail
        fields = '__all__'       
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        
