"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Meno je povinné').min(2, 'Meno musí mať aspoň 2 znaky'),
  email: z.string().min(1, 'Email je povinný').email('Neplatný email formát'),
  subject: z.string().min(1, 'Predmet je povinný').min(3, 'Predmet musí mať aspoň 3 znaky'),
  message: z.string().min(1, 'Správa je povinná').min(10, 'Správa musí mať aspoň 10 znakov'),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactFormDark() {
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
      <div className="max-w-2xl mx-auto">
        <div 
          className="p-8 bg-gradient-to-br from-green-900/30 to-emerald-800/30 backdrop-blur-sm border border-green-500/30 rounded-2xl shadow-xl transform transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-4"
          style={{
            animation: 'successSlideIn 0.7s ease-out'
          }}
        >
          <div className="text-center">
            <div className="relative">
              <CheckCircle 
                className="w-16 h-16 text-green-400 mx-auto mb-4 transform transition-all duration-500 ease-out"
                style={{
                  animation: 'successIconBounce 0.8s ease-out 0.3s both'
                }}
              />
              {/* Pulse ring animation */}
              <div 
                className="absolute inset-0 w-16 h-16 mx-auto border-2 border-green-400 rounded-full opacity-0"
                style={{
                  animation: 'successPulse 1.5s ease-out 0.5s'
                }}
              />
            </div>
            <h3 
              className="text-2xl font-bold text-green-300 mb-2 transform transition-all duration-500 ease-out"
              style={{
                animation: 'successTextSlide 0.6s ease-out 0.4s both'
              }}
            >
              Správa odoslaná!
            </h3>
            <p 
              className="text-green-200 transform transition-all duration-500 ease-out"
              style={{
                animation: 'successTextSlide 0.6s ease-out 0.6s both'
              }}
            >
              Ďakujeme za vašu správu. Ozveme sa vám čo najskôr.
            </p>
          </div>
        </div>
        
        {/* Custom CSS animations */}
        <style jsx>{`
          @keyframes successSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes successIconBounce {
            0% {
              opacity: 0;
              transform: scale(0.3) rotate(-10deg);
            }
            50% {
              opacity: 1;
              transform: scale(1.1) rotate(5deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }
          
          @keyframes successPulse {
            0% {
              opacity: 0.8;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(2);
            }
          }
          
          @keyframes successTextSlide {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="transform transition-all duration-700 ease-out"
        style={{
          animation: status === 'idle' ? 'formSlideIn 0.7s ease-out' : undefined
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl transform transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02]">
                 <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-4 transform transition-all duration-300 hover:scale-110 hover:bg-blue-500/20">
             <Mail className="w-8 h-8 text-blue-400 transform transition-all duration-300" />
           </div>
           <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-300">Pošlite nám správu</h3>
           <p className="text-slate-300 transform transition-all duration-300">
             Vyplňte formulár a my sa vám ozveme čo najskôr
           </p>
         </div>

                 <div className="grid sm:grid-cols-2 gap-6">
           {/* Meno */}
           <div className="transform transition-all duration-300 hover:scale-[1.02]">
             <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2 transition-colors duration-300">
               Meno *
             </label>
             <Input
               id="name"
               type="text"
               {...register('name')}
               placeholder="Vaše meno"
               disabled={status === 'loading'}
               className={`bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 ${
                 errors.name ? 'border-red-500 focus:ring-red-500/20' : ''
               } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900/70'}`}
             />
             {errors.name && (
               <p className="mt-1 text-sm text-red-400 animate-in slide-in-from-top-1 duration-300">{errors.name.message}</p>
             )}
           </div>

           {/* Email */}
           <div className="transform transition-all duration-300 hover:scale-[1.02]">
             <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 transition-colors duration-300">
               Email *
             </label>
             <Input
               id="email"
               type="email"
               {...register('email')}
               placeholder="vas@email.sk"
               disabled={status === 'loading'}
               className={`bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 ${
                 errors.email ? 'border-red-500 focus:ring-red-500/20' : ''
               } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900/70'}`}
             />
             {errors.email && (
               <p className="mt-1 text-sm text-red-400 animate-in slide-in-from-top-1 duration-300">{errors.email.message}</p>
             )}
           </div>
         </div>

                 {/* Predmet */}
         <div className="transform transition-all duration-300 hover:scale-[1.02]">
           <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2 transition-colors duration-300">
             Predmet *
           </label>
           <Input
             id="subject"
             type="text"
             {...register('subject')}
             placeholder="Predmet správy"
             disabled={status === 'loading'}
             className={`bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 ${
               errors.subject ? 'border-red-500 focus:ring-red-500/20' : ''
             } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900/70'}`}
           />
           {errors.subject && (
             <p className="mt-1 text-sm text-red-400 animate-in slide-in-from-top-1 duration-300">{errors.subject.message}</p>
           )}
         </div>

         {/* Správa */}
         <div className="transform transition-all duration-300 hover:scale-[1.02]">
           <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2 transition-colors duration-300">
             Správa *
           </label>
           <textarea
             id="message"
             rows={5}
             {...register('message')}
             placeholder="Vaša správa..."
             disabled={status === 'loading'}
             className={`w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 resize-none text-white placeholder-slate-400 transition-all duration-300 ${
               errors.message ? 'border-red-500 focus:ring-red-500/20' : ''
             } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900/70'}`}
           />
           {errors.message && (
             <p className="mt-1 text-sm text-red-400 animate-in slide-in-from-top-1 duration-300">{errors.message.message}</p>
           )}
         </div>

                 {/* Chybová správa */}
         {status === 'error' && (
           <div className="flex items-center gap-2 p-4 bg-red-900/30 border border-red-500/30 rounded-md backdrop-blur-sm animate-in slide-in-from-top-2 duration-500 shake">
             <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
             <p className="text-red-300">{errorMessage}</p>
           </div>
         )}

        {/* Submit tlačidlo */}
        <Button
          type="submit"
          disabled={!isValid || status === 'loading'}
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 text-sm sm:text-base px-6 sm:px-8 py-4 transform hover:scale-105 transition-all duration-500 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin relative z-10" />
              <span className="relative z-10">Odosielam...</span>
            </>
          ) : (
            <>
              <span className="relative z-10 font-semibold">Odoslať správu</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125 relative z-10" />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                 </Button>
       </form>
       
       {/* Custom CSS animations */}
       <style jsx>{`
         @keyframes formSlideIn {
           from {
             opacity: 0;
             transform: translateY(20px) scale(0.95);
           }
           to {
             opacity: 1;
             transform: translateY(0) scale(1);
           }
         }
         
         @keyframes shake {
           0%, 100% {
             transform: translateX(0);
           }
           25% {
             transform: translateX(-5px);
           }
           75% {
             transform: translateX(5px);
           }
         }
         
         .shake {
           animation: shake 0.5s ease-in-out;
         }
       `}</style>
     </div>
   </div>
   );
 } 