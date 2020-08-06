from rest_framework import serializers
from ..models import MPESAPayment

class MPESAPaymentSerializer(serializers.ModelSerializer):
    # product_details = serializers.HyperlinkedIdentityField(view_name="shop:product-details")
    class Meta:
        model = MPESAPayment
        fields = '__all__'
