from rest_framework.views import APIView


class SignUpView(APIView):
    def get(self, request,format=None):
        