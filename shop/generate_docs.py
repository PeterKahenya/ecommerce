import os
from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.db.models import Q
import datetime
from django.conf import settings
from .send_emails import send_docs


















receipt_no = 0
def get_receipt_no():
        global receipt_no
        day=datetime.datetime.today().day
        if day<10:
            day="0"+str(day)
        month=datetime.datetime.today().month
        if month<10:
            month="0"+str(month)
        current=receipt_no
        if receipt_no<10:
            current="0"+str(receipt_no)
        receipt=str(datetime.datetime.today().year)+str(month)+str(day)+str(current)
        receipt_no+=1
        return receipt

def link_callback(self,uri, rel):

        sUrl = settings.STATIC_URL      
        sRoot = settings.STATIC_ROOT    
        mUrl = settings.MEDIA_URL      
        mRoot = settings.MEDIA_ROOT    

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
        else:
            return uri

        if not os.path.isfile(path):
                raise Exception( 'media URI must start with %s or %s' % (sUrl, mUrl))
        return path

def generate_receipt(order,payment,number):
        subtotal=float(order.total_price)*(100/114)
        vat=float(order.total_price)-subtotal
        print(vat)
        print(subtotal)

        template = get_template('shop/receipt.html')
        context = {'receipt_no':number,'vat':round(vat,2),'subtotal':round(subtotal,2) ,'payment':payment,"products":payment.order.products.all(),'date':datetime.datetime.today().strftime('%d/%m/%Y')}
        html = template.render(context)
        receipt_file_path=os.path.join(settings.MEDIA_ROOT,"receipts/"+self.request.user.first_name+self.request.user.last_name+"Receipt"+self.get_receipt_no()+".pdf")
        receipt_file = open(receipt_file_path, "w+b")
        pisaStatus = pisa.CreatePDF(html, dest=receipt_file, link_callback=self.link_callback)
        
        if pisaStatus.err:
            return  None,False
        
        receipt_file.close()

        return receipt_file_path
    
def generate_lpo(order,payment,number):
        template = get_template('shop/lpo.html')
        subtotal=float(order.total_price)*(100/114)
        vat=float(payment.order.total_price)-subtotal

        context = {'receipt_no':number,'vat':round(vat,2),'subtotal':round(subtotal,2) ,'payment':payment,"products":order.order_items.all(),'date':datetime.datetime.today().strftime('%d/%m/%Y')}
        html = template.render(context)
        
        lpo_file_path=os.path.join(settings.MEDIA_ROOT,"lpos/"+order.checkout_by.first_name+order.checkout_by.last_name+"_LPO_"+str(number)+".pdf")
        receipt_file = open(receipt_file_path, "w+b")
        pisaStatus = pisa.CreatePDF(html, dest=receipt_file, link_callback=self.link_callback)
        if pisaStatus.err:
            return  None,False
        lpo_file_path.close()

        return lpo_file_path,True

def generate_and_send(address,request,payment):
    number=get_receipt_no()
    lpo_path,status_lpo = generate_lpo(address.order,payment,number) 
    receipt_path,status_receipt = generate_receipt(address.order,payment,number)

    if status_lpo and status_receipt:
        send_docs(payment=payment,email_address=request.user.email,receipt_path=receipt_path,user=request.user,lpo_path=lpo_path)
        return True
    else:
        return False


