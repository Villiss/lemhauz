"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Meno je povinné').min(2, 'Meno musí mať aspoň 2 znaky'),
  email: z.string().min(1, 'Email je povinný').email('Neplatný email formát'),
  subject: z.string().min(1, 'Predmet je povinný').min(3, 'Predmet musí mať aspoň 3 znaky'),
  message: z.string().min(1, 'Správa je povinná').min(10, 'Správa musí mať aspoň 10 znakov'),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Nastala neočakávaná chyba');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Nastala chyba pri odosielaní. Skúste to znova.');
    }
  };

  if (status === 'success') {
    return (
      <Card className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Správa odoslaná!</h3>
          <p className="text-green-700">
            Ďakujeme za vašu správu. Ozveme sa vám čo najskôr.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-sm border-white/30 shadow-xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Kontaktujte nás</h2>
        <p className="text-gray-600">
          Pošlite nám správu a my sa vám ozveme čo najskôr
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Meno */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Meno *
          </label>
          <Input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Vaše meno"
            className={`${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="vas@email.sk"
            className={`${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Predmet */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Predmet *
          </label>
          <Input
            id="subject"
            type="text"
            {...register('subject')}
            placeholder="Predmet správy"
            className={`${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        {/* Správa */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Správa *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            placeholder="Vaša správa..."
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
              errors.message ? 'border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Chybová správa */}
        {status === 'error' && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Submit tlačidlo */}
        <Button
          type="submit"
          disabled={!isValid || status === 'loading'}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Odosielam...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Odoslať správu
            </>
          )}
        </Button>
      </form>
    </Card>
  );
} 