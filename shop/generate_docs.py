def get_receipt_no(self):
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

    def receipt(self,payment,number):
        subtotal=float(payment.order.total_price)*(100/114)
        vat=float(payment.order.total_price)-subtotal
        print(vat)
        print(subtotal)

        template = get_template('shop/receipt.html')
        context = {'receipt_no':number,'vat':round(vat,2),'subtotal':round(subtotal,2) ,'payment':payment,"products":payment.order.products.all(),'date':datetime.datetime.today().strftime('%d/%m/%Y')}
        html = template.render(context)
        receipt_file_path=os.path.join(settings.MEDIA_ROOT,"receipts/"+self.request.user.first_name+self.request.user.last_name+"Receipt"+self.get_receipt_no()+".pdf")
        receipt_file = open(receipt_file_path, "w+b")
        pisaStatus = pisa.CreatePDF(html, dest=receipt_file, link_callback=self.link_callback)
        if pisaStatus.err:
            return HttpResponse('We had some errors <pre>' + html + '</pre>')
        receipt_file.close()
        return receipt_file_path
    
    def generate_po(self,payment,number):
        template = get_template('shop/lpo.html')
        subtotal=float(payment.order.total_price)*(100/114)
        vat=float(payment.order.total_price)-subtotal
        context = {'receipt_no':number,'vat':round(vat,2),'subtotal':round(subtotal,2) ,'payment':payment,"products":payment.order.products.all(),'date':datetime.datetime.today().strftime('%d/%m/%Y')}
        html = template.render(context)
        receipt_file_path=os.path.join(settings.MEDIA_ROOT,"lpos/"+self.request.user.first_name+self.request.user.last_name+"LPO"+self.get_receipt_no()+".pdf")
        receipt_file = open(receipt_file_path, "w+b")
        pisaStatus = pisa.CreatePDF(html, dest=receipt_file, link_callback=self.link_callback)
        if pisaStatus.err:
            return HttpResponse('We had some errors <pre>' + html + '</pre>')
        receipt_file.close()
        return receipt_file_path