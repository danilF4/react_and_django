from django.contrib import admin
from .models import MyUser
# Register your models here.
class PersonAdmin(admin.ModelAdmin):
    list_display = ('email', 'username')

    def token(self, obj):
    	return obj.token

    #def token(self, obj):
    #	return obj.token

admin.site.register(MyUser, PersonAdmin)