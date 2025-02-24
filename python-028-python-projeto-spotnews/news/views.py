from django.shortcuts import render, get_object_or_404, redirect
from news.models import News, Category, User
from news.forms import Category_Forms, News_Forms


def home(request):
    return render(request, "home.html", {"news": News.objects.all()})


def details(request, new_id):
    return render(request, "news_details.html", 
                  {"new": get_object_or_404(News, id=new_id),
                   "category": get_object_or_404(
                       News, id=new_id).categories.all()})


def categories(request):
    form = Category_Forms()
    context = {"form": form}
    if request.method == "POST":
        for _ in range(15):
            name = request.POST.get('name')
            Category.objects.create(name=name)
        return redirect("home-page")
    return render(request, "categories_form.html", context)


def form(request):
    form = News_Forms()
    if request.method == "POST":
        form = News_Forms(request.POST, request.FILES)
        if form.is_valid():
            category = form.cleaned_data.pop('categories')
            news = News.objects.create(**form.cleaned_data)
            for _ in range(15):
                news.categories.set(category)
            return redirect("home-page")

    return render(request, "news_form.html",
                  {
                      "form": form,
                      "users": User.objects.all(),
                      "categories": Category.objects.all()
                      })
