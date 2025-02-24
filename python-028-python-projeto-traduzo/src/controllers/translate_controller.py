from flask import Blueprint, render_template, request
from deep_translator import GoogleTranslator
from models.language_model import LanguageModel
from models.history_model import HistoryModel

translate_controller = Blueprint("translate_controller", __name__)


def get_languages():
    return [language.to_dict() for language in LanguageModel.find()]


def translate_text(source_language, target_language, text):
    translator = GoogleTranslator(source=source_language,
                                  target=target_language)
    return translator.translate(text=text)


def render_index_template(languages, text_to_translate, source_language,
                          target_language, translated_text):
    return render_template(
        "index.html", languages=languages,
        text_to_translate=text_to_translate,
        translate_from=source_language, translate_to=target_language,
        translated=translated_text
    )


# Reqs. 4 e 5
@translate_controller.route("/", methods=["GET", "POST"])
def index():
    languages = get_languages()

    if request.method == "GET":
        default_text = "O que deseja traduzir?"
        translated_text = translate_text(source_language="pt",
                                         target_language="en",
                                         text=default_text)
        return render_index_template(
            languages, default_text, "pt", "en", translated_text
        )

    if request.method == "POST":
        text_to_translate = request.form.get('text-to-translate')
        source_language = request.form.get('translate-from')
        target_language = request.form.get('translate-to')
        translated_text = translate_text(source_language, target_language,
                                         text_to_translate)

        history_entry = HistoryModel({
            'text_to_translate': text_to_translate,
            'translate_from': source_language,
            'translate_to': target_language
        })
        history_entry.save()

        return render_index_template(
            languages, text_to_translate, source_language, target_language,
            translated_text
        )


# Req. 6
@translate_controller.route("/reverse", methods=["POST"])
def reverse():
    languages = get_languages()
    text_to_translate = request.form.get('text-to-translate')
    source_language = request.form.get('translate-from')
    target_language = request.form.get('translate-to')
    translated_text = translate_text(source_language, target_language,
                                     text_to_translate)

    return render_index_template(
        languages, translated_text, target_language, source_language,
        text_to_translate
    )


@translate_controller.route("/history/", methods=["GET"])
def history():
    history_data = HistoryModel.list_as_json()
    return history_data
