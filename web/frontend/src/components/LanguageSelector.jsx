import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LanguageSelector = ({ onSelect }) => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    const handleLanguageSelect = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);

        // Set text direction based on language
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        if (onSelect) {
            onSelect();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">AgroConnect DZ</h1>
                    <p className="text-gray-600">
                        Please select your preferred language
                        <br />
                        <span className="font-arabic mt-2 block text-lg">الرجاء اختيار اللغة المفضلة</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleLanguageSelect('en')}
                        className="w-full group relative flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🇬🇧</span>
                            <div className="text-left">
                                <p className="font-bold text-gray-900">English</p>
                                <p className="text-sm text-gray-500">Continue in English</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-500 group-hover:bg-green-500 transition-colors"></div>
                    </button>

                    <button
                        onClick={() => handleLanguageSelect('ar')}
                        className="w-full group relative flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🇩🇿</span>
                            <div className="text-right">
                                <p className="font-bold text-gray-900 font-arabic">العربية</p>
                                <p className="text-sm text-gray-500 font-arabic">المتابعة باللغة العربية</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-500 group-hover:bg-green-500 transition-colors"></div>
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>You can change this later in settings</p>
                    <p className="font-arabic mt-1">يمكنك تغيير هذا لاحقاً في الإعدادات</p>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelector;
