import React from 'react';

/**
 * AnimatedBilibiliIcon Component
 * Bilibili Icon ကို မျက်လုံးနှစ်ကြိမ်ဆက်တိုက်မှေးခြင်း၊ ၁ စက္ကန့်စောင့်ခြင်း၊ ပြီးမှ ဘယ်/ညာ ကြည့်ခြင်း စသည့် လှုပ်ရှားမှုများဖြင့် ပြသသည်။
 * @param {object} props - Component props
 * @param {string} [props.size='7em'] - Icon အရွယ်အစား (ဥပမာ: '24px', '2em', '100%')
 * @param {string} [props.color='currentColor'] - Icon အရောင် (Tailwind CSS color class သို့မဟုတ် hex code)
 * @param {number} [props.squintAmount=0.5] - မှေးသွားမည့်ပမာဏ (0.1 သည် အများဆုံး မှေးခြင်း)
 */
const AnimatedBilibiliIcon = ({ size = '7em', color = 'currentColor', squintAmount = 0.5, ...props }) => {
  // စုစုပေါင်း Animation ကာလကို တွက်ချက်သည်
  const totalDuration = 5.0; // 5.0 စက္ကန့် (၁ စက္ကန့် စောင့်ချိန် ထည့်သွင်းထား)
  const squintStrength = squintAmount; // မျက်လုံးမှေးအား (0.5)
  
  // Keyframes ရာခိုင်နှုန်းများကို တွက်ချက်သည် (အချိန်ကိုက် ညှိထားသည်)
  const p1_squint_1 = (0.3 / totalDuration) * 100;  // 6.0% (ပထမ မှေး)
  const p2_open_1 = (0.5 / totalDuration) * 100;    // 10.0% (ပထမ ပွင့်)
  const p3_squint_2 = (0.8 / totalDuration) * 100;  // 16.0% (ဒုတိယ မှေး)
  const p4_open_2 = (1.0 / totalDuration) * 100;    // 20.0% (ဒုတိယ ပွင့်)
  
  // *** 1 စက္ကန့် စောင့်ဆိုင်းချိန် (1.0s မှ 2.0s အထိ) ***
  const p5_wait_over = (2.0 / totalDuration) * 100; // 40.0% (စောင့်ဆိုင်းပြီး)
  // --------------------------------------------------

  const p6_look_right = (2.4 / totalDuration) * 100; // 48.0% (ညာဘက် ကြည့်)
  const p7_look_left = (3.0 / totalDuration) * 100;  // 60.0% (ဘယ်ဘက် ကြည့်)
  const p8_center = (3.6 / totalDuration) * 100;     // 72.0% (ဗဟို ပြန်ရောက်)
  // 72% မှ 100% (3.6s မှ 5.0s) သည် နောက် loop အတွက် စောင့်ဆိုင်းချိန် (1.4s)

  // CSS Style ကို <style> tag ထဲတွင် ထည့်သွင်းထားသည်
  const style = `
    @keyframes complex-eye-movement {
      /* 0% - ပုံမှန်အနေအထား (ပွင့်/ဗဟို) */
      0% {
        transform: scaleY(1) translateX(0);
        animation-timing-function: ease-in-out; 
      }
      
      /* ${p1_squint_1.toFixed(2)}% - ပထမ မှေးခြင်း */
      ${p1_squint_1.toFixed(2)}% {
        transform: scaleY(${squintStrength}) translateX(0);
        animation-timing-function: ease-in-out; 
      }
      
      /* ${p2_open_1.toFixed(2)}% - ပထမ ပွင့်ခြင်း */
      ${p2_open_1.toFixed(2)}% {
        transform: scaleY(1) translateX(0);
        animation-timing-function: ease-in-out; 
      }
      
      /* ${p3_squint_2.toFixed(2)}% - ဒုတိယ မှေးခြင်း */
      ${p3_squint_2.toFixed(2)}% {
        transform: scaleY(${squintStrength}) translateX(0);
        animation-timing-function: ease-in-out; 
      }
      
      /* ${p4_open_2.toFixed(2)}% - ဒုတိယ ပွင့်ခြင်း (စောင့်ဆိုင်းမှု စတင်) */
      ${p4_open_2.toFixed(2)}% {
        transform: scaleY(1) translateX(0);
        animation-timing-function: linear; /* ၁ စက္ကန့် တိတိ ငြိမ်နေမည် */
      }

      /* ${p5_wait_over.toFixed(2)}% - ၁ စက္ကန့် စောင့်ပြီး (စောင့်ဆိုင်းမှု ပြီးဆုံး) */
      ${p5_wait_over.toFixed(2)}% {
        transform: scaleY(1) translateX(0);
        animation-timing-function: ease-out; /* ညာဘက်သို့ စကြည့်မည် */
      }

      /* ${p6_look_right.toFixed(2)}% - ညာဘက်သို့ ကြည့်ခြင်း */
      ${p6_look_right.toFixed(2)}% {
        transform: scaleY(1) translateX(3px);
        animation-timing-function: ease-in-out; 
      }

      /* ${p7_look_left.toFixed(2)}% - ဘယ်ဘက်သို့ ကြည့်ခြင်း */
      ${p7_look_left.toFixed(2)}% {
        transform: scaleY(1) translateX(-2px);
        animation-timing-function: ease-in; 
      }

      /* ${p8_center.toFixed(2)}% - ဗဟိုသို့ ပြန်လာခြင်း */
      ${p8_center.toFixed(2)}% {
        transform: scaleY(1) translateX(0);
        animation-timing-function: linear; /* 100% အထိ ငြိမ်နေမည် */
      }
      
      /* 100% - အဆုံး */
      100% {
        transform: scaleY(1) translateX(0);
      }
    }
    
    .animated-eye-group {
      transform-origin: center 14px; /* ဒေါင်လိုက်ဗဟိုချက် (မျက်လုံးအလယ်) */
      animation: complex-eye-movement ${totalDuration.toFixed(1)}s linear infinite; 
    }
  `;

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      fill="none"
      stroke={color} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2"
      {...props}
    >
      {/* Dynamic CSS ကို <style> tag ထဲတွင် ထည့်သွင်းထားသည် */}
      <style>{style}</style>
      
      <g>
        {/* မျက်နှာဘောင် (Face/Body) */}
        <rect 
          x="2" y="5" width="20" height="16" rx="4" 
          stroke="currentColor" 
          fill="none" 
        ></rect>
        
        {/* ဦးချိုများ (Antennae) */}
        <path 
          d="M7 2l3 3 M17 2l-3 3" 
          stroke="currentColor"
        ></path>
        
        {/* မျက်လုံးများ - လှုပ်ရှားမှုပေးရန်အတွက် Group ခွဲထားသည် */}
        <g className="animated-eye-group" stroke="currentColor">
          {/* ဘယ်ဘက်မျက်လုံး (Left Eye) - Height ကို 3 မှ 2 သို့ လျှော့ထားသည် */}
          <path d="M8 13 V 15" strokeWidth="2" />
          {/* ညာဘက်မျက်လုံး (Right Eye) - Height ကို 3 မှ 2 သို့ လျှော့ထားသည် */}
          <path d="M16 13 V 15" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
};

// ပြင်ပမှ ခေါ်ယူအသုံးပြုနိုင်ရန် export လုပ်ထားသည်။
export default AnimatedBilibiliIcon;