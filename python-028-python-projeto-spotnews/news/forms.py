from django import forms
from news.models import News


class News_Forms(forms.ModelForm):
    class Meta:
        model = News
        fields = "__all__"


class Category_Forms(forms.Form):
    name = forms.CharField(max_length=200, label="Nome")


category_form = Category_Forms()

news_form = News_Forms()
