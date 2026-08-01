import React from "react";

export default function HeroIllustration() {
  return (
    <div className="w-full max-w-[500px] mx-auto relative select-none">
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_16px_32px_rgba(78,52,46,0.08)]"
      >
        {/* Sky Background */}
        <rect width="500" height="400" rx="40" fill="#F4FAFF" />

        {/* Soft Background Sun Rays */}
        <circle cx="420" cy="80" r="140" fill="#FFF5E5" opacity="0.6" />
        <circle cx="420" cy="80" r="90" fill="#FFECCF" opacity="0.8" />

        {/* Sun */}
        <circle cx="420" cy="80" r="45" fill="#FFD08A" />

        {/* Clouds (Grouped with CSS float animations) */}
        <g className="animate-[bounce_6s_infinite_ease-in-out]">
          {/* Cloud 1 */}
          <path
            d="M50 120 C50 109 59 100 70 100 C74 100 78 101.2 81.5 103.3 C86 95.5 94.3 90 104 90 C116.5 90 126.8 99 128.8 111 C135 111 140 116 140 122.2 C140 128.5 135 133.5 128.8 133.5 L70 133.5 C59 133.5 50 127.5 50 120 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
        </g>

        <g className="animate-[bounce_8s_infinite_ease-in-out_1s]">
          {/* Cloud 2 */}
          <path
            d="M300 80 C300 71.7 306.7 65 315 65 C318 65 321 66 323.5 67.5 C327 61.5 333.3 57.5 340.5 57.5 C350 57.5 357.7 64.3 359 73.3 C363.8 73.3 367.5 77 367.5 81.7 C367.5 86.4 363.8 90 359 90 L315 90 C306.7 90 300 85.5 300 80 Z"
            fill="#FFFFFF"
            opacity="0.8"
          />
        </g>

        {/* Back Hills */}
        <path
          d="M0 310 Q140 250 280 290 T500 270 L500 400 L0 400 Z"
          fill="#D6EEDB"
        />

        {/* Tree 1 (Back Left) */}
        <rect x="75" y="200" width="12" height="80" rx="6" fill="#9A6B3F" />
        {/* Tree Leaves */}
        <circle cx="81" cy="180" r="35" fill="#81C784" />
        <circle cx="60" cy="190" r="25" fill="#66BB6A" />
        <circle cx="100" cy="185" r="28" fill="#4CAF50" opacity="0.9" />

        {/* Front Hills */}
        <path
          d="M0 340 Q110 300 240 330 T500 310 L500 400 L0 400 Z"
          fill="#5FA85B"
        />

        {/* Tree 2 (Right) */}
        <rect x="380" y="220" width="16" height="110" rx="8" fill="#8D5B2E" />
        {/* Foliage */}
        <path
          d="M340 200 C340 172.4 362.4 150 390 150 C417.6 150 440 172.4 440 200 C440 227.6 417.6 250 390 250 C362.4 250 340 227.6 340 200 Z"
          fill="#4E9A49"
        />
        <circle cx="370" cy="180" r="30" fill="#5EAA58" />
        <circle cx="410" cy="185" r="25" fill="#3D8538" />

        {/* Little Bird in Tree */}
        <path
          d="M375 175 C375 171.7 377.7 169 381 169 C384.3 169 387 171.7 387 175 L387 178 C387 179.7 385.7 181 384 181 L378 181 C376.3 181 375 179.7 375 178 Z"
          fill="#B8E6FF"
        />
        {/* Bird Beak */}
        <polygon points="387,173 391,174 387,176" fill="#FFC107" />
        {/* Bird Eye */}
        <circle cx="380" cy="173" r="0.75" fill="#4E342E" />

        {/* Dog (Sitting on Front Grass) */}
        {/* Tail */}
        <path
          d="M 235 340 Q 255 330 250 310"
          stroke="#E7C79F"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Body */}
        <rect x="180" y="295" width="55" height="55" rx="16" fill="#E7C79F" />
        {/* Collar */}
        <rect x="192" y="290" width="31" height="6" rx="3" fill="#5FA85B" />
        {/* Head */}
        <rect x="187" y="248" width="41" height="42" rx="14" fill="#E7C79F" />
        {/* Left Ear */}
        <path
          d="M 183 252 Q 170 262 180 277"
          stroke="#4E342E"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Ear */}
        <path
          d="M 232 252 Q 245 262 235 277"
          stroke="#4E342E"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Dog Eyes */}
        <circle cx="200" cy="265" r="3" fill="#4E342E" />
        <circle cx="215" cy="265" r="3" fill="#4E342E" />
        {/* Dog Snout & Nose */}
        <ellipse cx="207.5" cy="275" rx="7" ry="5" fill="#FFFFFF" />
        <circle cx="207.5" cy="272" r="3.5" fill="#4E342E" />

        {/* Cat (Sitting Cozy beside Dog) */}
        {/* Tail */}
        <path
          d="M 172 345 C 160 345 155 330 162 318"
          stroke="#9A6B3F"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Body */}
        <rect x="142" y="310" width="34" height="40" rx="11" fill="#9A6B3F" />
        {/* Head */}
        <circle cx="159" cy="292" r="15" fill="#9A6B3F" />
        {/* Cat Ears */}
        <polygon points="146,288 152,274 156,284" fill="#4E342E" />
        <polygon points="172,288 166,274 162,284" fill="#4E342E" />
        {/* Cat Eyes */}
        <circle cx="153" cy="291" r="2" fill="#B8E6FF" />
        <circle cx="165" cy="291" r="2" fill="#B8E6FF" />
        {/* Cat Nose & Whiskers */}
        <polygon points="159,295 157.5,293 160.5,293" fill="#FFA7A7" />
        <line x1="147" y1="296" x2="152" y2="296" stroke="#E7C79F" strokeWidth="1" />
        <line x1="171" y1="296" x2="166" y2="296" stroke="#E7C79F" strokeWidth="1" />

        {/* Rabbit (Cozy in Front Grass) */}
        <path
          d="M 285 348 C 285 340 295 330 310 330 C 325 330 335 340 335 348 Z"
          fill="#FFFFFF"
        />
        {/* Rabbit Head */}
        <circle cx="322" cy="326" r="10" fill="#FFFFFF" />
        {/* Rabbit Ears */}
        <ellipse
          cx="318"
          cy="312"
          rx="3.5"
          ry="10"
          fill="#FFFFFF"
          transform="rotate(-15 318 312)"
        />
        <ellipse
          cx="318"
          cy="312"
          rx="1.5"
          ry="7"
          fill="#FFC5C5"
          transform="rotate(-15 318 312)"
        />
        <ellipse
          cx="326"
          cy="312"
          rx="3.5"
          ry="10"
          fill="#FFFFFF"
          transform="rotate(10 326 312)"
        />
        <ellipse
          cx="326"
          cy="312"
          rx="1.5"
          ry="7"
          fill="#FFC5C5"
          transform="rotate(10 326 312)"
        />
        {/* Rabbit Eye */}
        <circle cx="324" cy="324" r="1" fill="#FFA7A7" />
        {/* Rabbit Tail */}
        <circle cx="286" cy="342" r="4.5" fill="#FFFFFF" />

        {/* Dandelion / Grass Accents */}
        <g stroke="#9CD5F5" strokeWidth="2" strokeLinecap="round" opacity="0.4">
          <line x1="45" y1="360" x2="45" y2="350" />
          <line x1="45" y1="350" x2="40" y2="345" />
          <line x1="45" y1="350" x2="50" y2="345" />
        </g>
        <g stroke="#E7C79F" strokeWidth="2" strokeLinecap="round" opacity="0.6">
          <line x1="360" y1="370" x2="360" y2="358" />
          <line x1="360" y1="358" x2="355" y2="353" />
          <line x1="360" y1="358" x2="365" y2="353" />
        </g>
      </svg>
    </div>
  );
}
