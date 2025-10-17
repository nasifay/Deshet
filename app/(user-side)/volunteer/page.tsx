"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  age: string;
  gender: string;
  location: string;
  motivation: string;
  document: File | null;
}

// All country codes with flags - sorted by number of digits (1-digit, 2-digit, 3-digit, 4-digit)
const countryCodes = [
  // 1-digit codes
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "+7", country: "KZ", flag: "🇰🇿", name: "Kazakhstan" },
  // 2-digit codes
  { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "+30", country: "GR", flag: "🇬🇷", name: "Greece" },
  { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "+32", country: "BE", flag: "🇧🇪", name: "Belgium" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+36", country: "HU", flag: "🇭🇺", name: "Hungary" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+40", country: "RO", flag: "🇷🇴", name: "Romania" },
  { code: "+41", country: "CH", flag: "🇨🇭", name: "Switzerland" },
  { code: "+43", country: "AT", flag: "🇦🇹", name: "Austria" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+45", country: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "+46", country: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", country: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "+48", country: "PL", flag: "🇵🇱", name: "Poland" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+51", country: "PE", flag: "🇵🇪", name: "Peru" },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "+53", country: "CU", flag: "🇨🇺", name: "Cuba" },
  { code: "+54", country: "AR", flag: "🇦🇷", name: "Argentina" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+56", country: "CL", flag: "🇨🇱", name: "Chile" },
  { code: "+57", country: "CO", flag: "🇨🇴", name: "Colombia" },
  { code: "+58", country: "VE", flag: "🇻🇪", name: "Venezuela" },
  { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+62", country: "ID", flag: "🇮🇩", name: "Indonesia" },
  { code: "+63", country: "PH", flag: "🇵🇭", name: "Philippines" },
  { code: "+64", country: "NZ", flag: "🇳🇿", name: "New Zealand" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+66", country: "TH", flag: "🇹🇭", name: "Thailand" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+84", country: "VN", flag: "🇻🇳", name: "Vietnam" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+90", country: "TR", flag: "🇹🇷", name: "Turkey" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+92", country: "PK", flag: "🇵🇰", name: "Pakistan" },
  { code: "+93", country: "AF", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+94", country: "LK", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+95", country: "MM", flag: "🇲🇲", name: "Myanmar" },
  { code: "+98", country: "IR", flag: "🇮🇷", name: "Iran" },
  // 3-digit codes
  { code: "+211", country: "SS", flag: "🇸🇸", name: "South Sudan" },
  { code: "+212", country: "MA", flag: "🇲🇦", name: "Morocco" },
  { code: "+213", country: "DZ", flag: "🇩🇿", name: "Algeria" },
  { code: "+216", country: "TN", flag: "🇹🇳", name: "Tunisia" },
  { code: "+218", country: "LY", flag: "🇱🇾", name: "Libya" },
  { code: "+220", country: "GM", flag: "🇬🇲", name: "Gambia" },
  { code: "+221", country: "SN", flag: "🇸🇳", name: "Senegal" },
  { code: "+222", country: "MR", flag: "🇲🇷", name: "Mauritania" },
  { code: "+223", country: "ML", flag: "🇲🇱", name: "Mali" },
  { code: "+224", country: "GN", flag: "🇬🇳", name: "Guinea" },
  { code: "+225", country: "CI", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+226", country: "BF", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+227", country: "NE", flag: "🇳🇪", name: "Niger" },
  { code: "+228", country: "TG", flag: "🇹🇬", name: "Togo" },
  { code: "+229", country: "BJ", flag: "🇧🇯", name: "Benin" },
  { code: "+230", country: "MU", flag: "🇲🇺", name: "Mauritius" },
  { code: "+231", country: "LR", flag: "🇱🇷", name: "Liberia" },
  { code: "+232", country: "SL", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "+233", country: "GH", flag: "🇬🇭", name: "Ghana" },
  { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
  { code: "+235", country: "TD", flag: "🇹🇩", name: "Chad" },
  { code: "+236", country: "CF", flag: "🇨🇫", name: "Central African Republic" },
  { code: "+237", country: "CM", flag: "🇨🇲", name: "Cameroon" },
  { code: "+238", country: "CV", flag: "🇨🇻", name: "Cape Verde" },
  { code: "+239", country: "ST", flag: "🇸🇹", name: "São Tomé and Príncipe" },
  { code: "+240", country: "GQ", flag: "🇬🇶", name: "Equatorial Guinea" },
  { code: "+241", country: "GA", flag: "🇬🇦", name: "Gabon" },
  { code: "+242", country: "CG", flag: "🇨🇬", name: "Congo" },
  {
    code: "+243",
    country: "CD",
    flag: "🇨🇩",
    name: "Congo, Democratic Republic",
  },
  { code: "+244", country: "AO", flag: "🇦🇴", name: "Angola" },
  { code: "+245", country: "GW", flag: "🇬🇼", name: "Guinea-Bissau" },
  { code: "+248", country: "SC", flag: "🇸🇨", name: "Seychelles" },
  { code: "+249", country: "SD", flag: "🇸🇩", name: "Sudan" },
  { code: "+250", country: "RW", flag: "🇷🇼", name: "Rwanda" },
  { code: "+251", country: "ET", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+252", country: "SO", flag: "🇸🇴", name: "Somalia" },
  { code: "+253", country: "DJ", flag: "🇩🇯", name: "Djibouti" },
  { code: "+254", country: "KE", flag: "🇰🇪", name: "Kenya" },
  { code: "+255", country: "TZ", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", country: "UG", flag: "🇺🇬", name: "Uganda" },
  { code: "+257", country: "BI", flag: "🇧🇮", name: "Burundi" },
  { code: "+258", country: "MZ", flag: "🇲🇿", name: "Mozambique" },
  { code: "+260", country: "ZM", flag: "🇿🇲", name: "Zambia" },
  { code: "+261", country: "MG", flag: "🇲🇬", name: "Madagascar" },
  { code: "+262", country: "RE", flag: "🇷🇪", name: "Réunion" },
  { code: "+262", country: "YT", flag: "🇾🇹", name: "Mayotte" },
  { code: "+263", country: "ZW", flag: "🇿🇼", name: "Zimbabwe" },
  { code: "+264", country: "NA", flag: "🇳🇦", name: "Namibia" },
  { code: "+265", country: "MW", flag: "🇲🇼", name: "Malawi" },
  { code: "+266", country: "LS", flag: "🇱🇸", name: "Lesotho" },
  { code: "+267", country: "BW", flag: "🇧🇼", name: "Botswana" },
  { code: "+268", country: "SZ", flag: "🇸🇿", name: "Eswatini" },
  { code: "+269", country: "KM", flag: "🇰🇲", name: "Comoros" },
  { code: "+290", country: "SH", flag: "🇸🇭", name: "Saint Helena" },
  { code: "+291", country: "ER", flag: "🇪🇷", name: "Eritrea" },
  { code: "+297", country: "AW", flag: "🇦🇼", name: "Aruba" },
  { code: "+298", country: "FO", flag: "🇫🇴", name: "Faroe Islands" },
  { code: "+299", country: "GL", flag: "🇬🇱", name: "Greenland" },
  { code: "+350", country: "GI", flag: "🇬🇮", name: "Gibraltar" },
  { code: "+351", country: "PT", flag: "🇵🇹", name: "Portugal" },
  { code: "+352", country: "LU", flag: "🇱🇺", name: "Luxembourg" },
  { code: "+353", country: "IE", flag: "🇮🇪", name: "Ireland" },
  { code: "+354", country: "IS", flag: "🇮🇸", name: "Iceland" },
  { code: "+355", country: "AL", flag: "🇦🇱", name: "Albania" },
  { code: "+356", country: "MT", flag: "🇲🇹", name: "Malta" },
  { code: "+357", country: "CY", flag: "🇨🇾", name: "Cyprus" },
  { code: "+358", country: "FI", flag: "🇫🇮", name: "Finland" },
  { code: "+359", country: "BG", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+370", country: "LT", flag: "🇱🇹", name: "Lithuania" },
  { code: "+371", country: "LV", flag: "🇱🇻", name: "Latvia" },
  { code: "+372", country: "EE", flag: "🇪🇪", name: "Estonia" },
  { code: "+373", country: "MD", flag: "🇲🇩", name: "Moldova" },
  { code: "+374", country: "AM", flag: "🇦🇲", name: "Armenia" },
  { code: "+375", country: "BY", flag: "🇧🇾", name: "Belarus" },
  { code: "+376", country: "AD", flag: "🇦🇩", name: "Andorra" },
  { code: "+377", country: "MC", flag: "🇲🇨", name: "Monaco" },
  { code: "+378", country: "SM", flag: "🇸🇲", name: "San Marino" },
  { code: "+379", country: "VA", flag: "🇻🇦", name: "Vatican City" },
  { code: "+380", country: "UA", flag: "🇺🇦", name: "Ukraine" },
  { code: "+381", country: "RS", flag: "🇷🇸", name: "Serbia" },
  { code: "+382", country: "ME", flag: "🇲🇪", name: "Montenegro" },
  { code: "+383", country: "XK", flag: "🇽🇰", name: "Kosovo" },
  { code: "+385", country: "HR", flag: "🇭🇷", name: "Croatia" },
  { code: "+386", country: "SI", flag: "🇸🇮", name: "Slovenia" },
  { code: "+387", country: "BA", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { code: "+389", country: "MK", flag: "🇲🇰", name: "North Macedonia" },
  { code: "+420", country: "CZ", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+421", country: "SK", flag: "🇸🇰", name: "Slovakia" },
  { code: "+423", country: "LI", flag: "🇱🇮", name: "Liechtenstein" },
  { code: "+500", country: "FK", flag: "🇫🇰", name: "Falkland Islands" },
  { code: "+501", country: "BZ", flag: "🇧🇿", name: "Belize" },
  { code: "+502", country: "GT", flag: "🇬🇹", name: "Guatemala" },
  { code: "+503", country: "SV", flag: "🇸🇻", name: "El Salvador" },
  { code: "+504", country: "HN", flag: "🇭🇳", name: "Honduras" },
  { code: "+505", country: "NI", flag: "🇳🇮", name: "Nicaragua" },
  { code: "+506", country: "CR", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+507", country: "PA", flag: "🇵🇦", name: "Panama" },
  {
    code: "+508",
    country: "PM",
    flag: "🇵🇲",
    name: "Saint Pierre and Miquelon",
  },
  { code: "+509", country: "HT", flag: "🇭🇹", name: "Haiti" },
  { code: "+590", country: "GP", flag: "🇬🇵", name: "Guadeloupe" },
  { code: "+590", country: "BL", flag: "🇧🇱", name: "Saint Barthélemy" },
  { code: "+590", country: "MF", flag: "🇲🇫", name: "Saint Martin" },
  { code: "+591", country: "BO", flag: "🇧🇴", name: "Bolivia" },
  { code: "+592", country: "GY", flag: "🇬🇾", name: "Guyana" },
  { code: "+593", country: "EC", flag: "🇪🇨", name: "Ecuador" },
  { code: "+594", country: "GF", flag: "🇬🇫", name: "French Guiana" },
  { code: "+595", country: "PY", flag: "🇵🇾", name: "Paraguay" },
  { code: "+596", country: "MQ", flag: "🇲🇶", name: "Martinique" },
  { code: "+597", country: "SR", flag: "🇸🇷", name: "Suriname" },
  { code: "+598", country: "UY", flag: "🇺🇾", name: "Uruguay" },
  { code: "+599", country: "CW", flag: "🇨🇼", name: "Curaçao" },
  { code: "+670", country: "TL", flag: "🇹🇱", name: "Timor-Leste" },
  { code: "+673", country: "BN", flag: "🇧🇳", name: "Brunei" },
  { code: "+674", country: "NR", flag: "🇳🇷", name: "Nauru" },
  { code: "+675", country: "PG", flag: "🇵🇬", name: "Papua New Guinea" },
  { code: "+676", country: "TO", flag: "🇹🇴", name: "Tonga" },
  { code: "+677", country: "SB", flag: "🇸🇧", name: "Solomon Islands" },
  { code: "+678", country: "VU", flag: "🇻🇺", name: "Vanuatu" },
  { code: "+679", country: "FJ", flag: "🇫🇯", name: "Fiji" },
  { code: "+680", country: "PW", flag: "🇵🇼", name: "Palau" },
  { code: "+681", country: "WF", flag: "🇼🇫", name: "Wallis and Futuna" },
  { code: "+682", country: "CK", flag: "🇨🇰", name: "Cook Islands" },
  { code: "+683", country: "NU", flag: "🇳🇺", name: "Niue" },
  { code: "+685", country: "WS", flag: "🇼🇸", name: "Samoa" },
  { code: "+686", country: "KI", flag: "🇰🇮", name: "Kiribati" },
  { code: "+687", country: "NC", flag: "🇳🇨", name: "New Caledonia" },
  { code: "+688", country: "TV", flag: "🇹🇻", name: "Tuvalu" },
  { code: "+689", country: "PF", flag: "🇵🇫", name: "French Polynesia" },
  { code: "+690", country: "TK", flag: "🇹🇰", name: "Tokelau" },
  { code: "+691", country: "FM", flag: "🇫🇲", name: "Micronesia" },
  { code: "+692", country: "MH", flag: "🇲🇭", name: "Marshall Islands" },
  { code: "+850", country: "KP", flag: "🇰🇵", name: "North Korea" },
  { code: "+852", country: "HK", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+853", country: "MO", flag: "🇲🇴", name: "Macao" },
  { code: "+855", country: "KH", flag: "🇰🇭", name: "Cambodia" },
  { code: "+856", country: "LA", flag: "🇱🇦", name: "Laos" },
  { code: "+880", country: "BD", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+886", country: "TW", flag: "🇹🇼", name: "Taiwan" },
  { code: "+960", country: "MV", flag: "🇲🇻", name: "Maldives" },
  { code: "+961", country: "LB", flag: "🇱🇧", name: "Lebanon" },
  { code: "+962", country: "JO", flag: "🇯🇴", name: "Jordan" },
  { code: "+963", country: "SY", flag: "🇸🇾", name: "Syria" },
  { code: "+964", country: "IQ", flag: "🇮🇶", name: "Iraq" },
  { code: "+965", country: "KW", flag: "🇰🇼", name: "Kuwait" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+967", country: "YE", flag: "🇾🇪", name: "Yemen" },
  { code: "+968", country: "OM", flag: "🇴🇲", name: "Oman" },
  { code: "+970", country: "PS", flag: "🇵🇸", name: "Palestine" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+972", country: "IL", flag: "🇮🇱", name: "Israel" },
  { code: "+973", country: "BH", flag: "🇧🇭", name: "Bahrain" },
  { code: "+974", country: "QA", flag: "🇶🇦", name: "Qatar" },
  { code: "+975", country: "BT", flag: "🇧🇹", name: "Bhutan" },
  { code: "+976", country: "MN", flag: "🇲🇳", name: "Mongolia" },
  { code: "+977", country: "NP", flag: "🇳🇵", name: "Nepal" },
  { code: "+992", country: "TJ", flag: "🇹🇯", name: "Tajikistan" },
  { code: "+993", country: "TM", flag: "🇹🇲", name: "Turkmenistan" },
  { code: "+994", country: "AZ", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "+995", country: "GE", flag: "🇬🇪", name: "Georgia" },
  { code: "+996", country: "KG", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "+998", country: "UZ", flag: "🇺🇿", name: "Uzbekistan" },
  // 4-digit codes
  { code: "+1242", country: "BS", flag: "🇧🇸", name: "Bahamas" },
  { code: "+1246", country: "BB", flag: "🇧🇧", name: "Barbados" },
  { code: "+1264", country: "AI", flag: "🇦🇮", name: "Anguilla" },
  { code: "+1268", country: "AG", flag: "🇦🇬", name: "Antigua and Barbuda" },
  {
    code: "+1284",
    country: "VG",
    flag: "🇻🇬",
    name: "Virgin Islands (British)",
  },
  { code: "+1340", country: "VI", flag: "🇻🇮", name: "Virgin Islands (US)" },
  { code: "+1345", country: "KY", flag: "🇰🇾", name: "Cayman Islands" },
  { code: "+1441", country: "BM", flag: "🇧🇲", name: "Bermuda" },
  { code: "+1473", country: "GD", flag: "🇬🇩", name: "Grenada" },
  {
    code: "+1649",
    country: "TC",
    flag: "🇹🇨",
    name: "Turks and Caicos Islands",
  },
  { code: "+1664", country: "MS", flag: "🇲🇸", name: "Montserrat" },
  {
    code: "+1670",
    country: "MP",
    flag: "🇲🇵",
    name: "Northern Mariana Islands",
  },
  { code: "+1671", country: "GU", flag: "🇬🇺", name: "Guam" },
  { code: "+1684", country: "AS", flag: "🇦🇸", name: "American Samoa" },
  { code: "+1721", country: "SX", flag: "🇸🇽", name: "Sint Maarten" },
  { code: "+1758", country: "LC", flag: "🇱🇨", name: "Saint Lucia" },
  { code: "+1767", country: "DM", flag: "🇩🇲", name: "Dominica" },
  {
    code: "+1784",
    country: "VC",
    flag: "🇻🇨",
    name: "Saint Vincent and the Grenadines",
  },
  { code: "+1787", country: "PR", flag: "🇵🇷", name: "Puerto Rico" },
  { code: "+1809", country: "DO", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "+1868", country: "TT", flag: "🇹🇹", name: "Trinidad and Tobago" },
  { code: "+1869", country: "KN", flag: "🇰🇳", name: "Saint Kitts and Nevis" },
  { code: "+1876", country: "JM", flag: "🇯🇲", name: "Jamaica" },
];

const FormField = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  min,
  max,
}: {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      min={min}
      max={max}
      className="w-full h-[48px] rounded-[8px] bg-white border border-[#E5E5E5] px-4 text-[#333333] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] disabled:opacity-[0.6]"
    />
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}: {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full h-[48px] rounded-[8px] bg-white border border-[#E5E5E5] px-4 text-[#333333] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] disabled:opacity-[0.6]"
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const PhoneField = ({
  label,
  countryCodeValue,
  phoneValue,
  onCountryCodeChange,
  onPhoneChange,
  required = false,
  disabled = false,
}: {
  label: string;
  countryCodeValue: string;
  phoneValue: string;
  onCountryCodeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <div className="flex gap-2">
      <select
        name="countryCode"
        value={countryCodeValue}
        onChange={onCountryCodeChange}
        required={required}
        disabled={disabled}
        className="w-[140px] h-[48px] rounded-[8px] bg-white border border-[#E5E5E5] px-2 text-[#333333] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] disabled:opacity-[0.6]"
      >
        <option value="">Code</option>
        {countryCodes.map((country, index) => (
          <option
            key={`${country.code}-${country.country}-${index}`}
            value={country.code}
          >
            {country.flag} {country.code}
          </option>
        ))}
      </select>
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={phoneValue}
        onChange={onPhoneChange}
        required={required}
        disabled={disabled}
        className="flex-1 h-[48px] rounded-[8px] bg-white border border-[#E5E5E5] px-4 text-[#333333] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] disabled:opacity-[0.6]"
      />
    </div>
  </div>
);

const MessageField = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full rounded-[8px] bg-white border border-[#E5E5E5] px-4 py-3 text-[#333333] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] resize-none disabled:opacity-[0.6]"
    ></textarea>
  </div>
);

const FileUploadField = ({
  label,
  name,
  onChange,
  accept,
  required = false,
  disabled = false,
  file,
}: {
  label: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  file?: File | null;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <div className="relative">
      <input
        type="file"
        name={name}
        onChange={onChange}
        accept={accept}
        required={required}
        disabled={disabled}
        className="w-full h-[48px] rounded-[8px] bg-white border border-[#E5E5E5] px-4 text-[#333333] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] disabled:opacity-[0.6] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4EB778] file:text-white hover:file:bg-[#3fa76a]"
      />
    </div>
    {file && (
      <p className="text-sm text-gray-600">
        Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
      </p>
    )}
    <p className="text-xs text-gray-500">
      Upload your resume/CV (PDF, DOC, DOCX, or TXT - Max 10MB)
    </p>
  </div>
);

export default function VolunteerPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    countryCode: "+251",
    phone: "",
    age: "",
    gender: "",
    location: "",
    motivation: "",
    document: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Prepare form data for submission
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", `${formData.countryCode} ${formData.phone}`);
      submitData.append("age", formData.age);
      submitData.append("gender", formData.gender);
      submitData.append("location", formData.location);
      submitData.append("motivation", formData.motivation);
      submitData.append("availability", "flexible");
      submitData.append("referenceSource", "Website");

      if (formData.document) {
        submitData.append("document", formData.document);
      }

      const response = await fetch("/api/volunteer/submit", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        setFormData({
          fullName: "",
          email: "",
          countryCode: "+251",
          phone: "",
          age: "",
          gender: "",
          location: "",
          motivation: "",
          document: null,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">
      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-16">
        {/* Title */}
        <h1 className="text-[32px] sm:text-[40px] md:text-[44px] font-bold text-[#2E8B57] uppercase mb-12 tracking-wide text-center">
          JOIN AS A VOLUNTEER
        </h1>

        {/* Green CTA Banner */}
        <div className="w-full max-w-[900px] bg-primary-green/90 rounded-[25px] shadow-lg flex flex-col md:flex-row items-center justify-between overflow-hidden px-8 py-10 mb-16 relative">
          {/* Green Container Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png')] bg-cover bg-center opacity-[0.5]" />

          {/* Left Image */}
          <div className="flex justify-center md:justify-start mb-6 md:mb-0 relative z-10">
            <Image
              src="https://c.animaapp.com/mgdc97zk62g2qg/img/rectangle-928.svg"
              alt="Volunteering"
              className="w-[200px] h-[150px] object-cover rounded-[12px]"
              width={200}
              height={150}
            />
          </div>

          {/* Right Text */}
          <div className="text-white md:pl-8 text-center md:text-left leading-relaxed relative z-10">
            <p className="text-[24px] md:text-[28px] font-bold">
              Join A Network Of{" "}
              <span className="font-normal">People Committed To </span>
              <br />
              Equality, Empowerment, And{" "}
              <span className="text-[#FBB040] font-bold">
                Sustainable Change.
              </span>
            </p>
          </div>
        </div>

        {/* Volunteer Form */}
        <div className="w-full lg:w-[80vw] bg-white rounded-[20px] border border-[#EAEAEA] shadow-lg relative overflow-hidden">
          {/* Form Container Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png')] bg-cover bg-center opacity-[0.05]" />
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col gap-6 relative z-10 p-6 md:px-20 lg:px-28 lg:w-2/3 items-center justify-center"
          >
            <FormField
              label="Name"
              placeholder="enter here"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
                { value: "prefer-not-to-say", label: "Prefer not to say" },
              ]}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Age"
              placeholder="15-100"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min={15}
              max={100}
              required
              disabled={isSubmitting}
            />
            <PhoneField
              label="Phone Number"
              countryCodeValue={formData.countryCode}
              phoneValue={formData.phone}
              onCountryCodeChange={handleInputChange}
              onPhoneChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Email Address"
              placeholder="enter here"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Address"
              placeholder="enter here"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <MessageField
              label="Message"
              placeholder="Type here"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FileUploadField
              label="Upload Resume/CV (Optional)"
              name="document"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              disabled={isSubmitting}
              file={formData.document}
            />

            {/* Submit Status */}
            {submitStatus.type && (
              <div
                className={`w-full p-4 rounded-lg text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[50px] bg-[#4EB778] hover:bg-[#3fa76a] transition-all duration-200 text-white font-medium text-[16px] rounded-[8px] shadow-md disabled:opacity-[0.6] disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
