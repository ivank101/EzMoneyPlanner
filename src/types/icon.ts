// types/icon.ts
import { IconType } from 'react-icons';
import {
  FaWallet,
  FaPiggyBank,
  FaChartLine,
  FaChartBar,
  FaCog,
  FaHome,
  FaCar,
  FaUtensils,
  FaTshirt,
  FaLightbulb,
  FaGift,
  FaMugHot,
  FaBriefcaseMedical,
  FaCalculator,
  FaDumbbell,
  FaSuitcase,
  FaGraduationCap,
  FaCouch,
  FaPaw,
  FaMobileAlt,
  FaBook,
  FaMusic,
  FaFilm,
  FaGamepad,
  FaFootballBall,
  FaSmile,
  FaWineGlassAlt,
  FaTruck,
  FaTv,
  FaGifts,
  FaTools,
  FaBriefcase,
  FaHeart,
  FaPlane,
  FaCamera,
  FaHeartbeat,
  FaHamburger,
  FaPizzaSlice,
  FaIceCream,
  FaCoffee,
  FaCookie,
  FaGhost,
  FaTree,
  FaBirthdayCake,
} from 'react-icons/fa';

interface IconMapping {
  key: string;
  icon: IconType;
  color: string;
}

export const iconMappings: IconMapping[] = [
  { key: '一般財務', icon: FaWallet, color: 'var(--primary)' }, // General Finance
  { key: '豚の貯金箱', icon: FaPiggyBank, color: 'var(--yellow)' }, // Piggy Bank
  { key: '棒グラフ', icon: FaChartBar, color: 'var(--red)' }, // Bar Chart
  { key: '歯車', icon: FaCog, color: 'var(--orange)' }, // Gear (Settings)
  { key: '住宅', icon: FaHome, color: 'var(--yellow)' }, // House (Home Expenses)
  { key: '交通', icon: FaCar, color: 'var(--green)' }, // Car (Transportation)
  { key: '食費', icon: FaUtensils, color: 'var(--indigo)' }, // Food & Dining
  { key: '装身具費', icon: FaTshirt, color: 'var(--blue)' }, // Clothing & Apparel
  { key: '光熱費', icon: FaLightbulb, color: 'var(--cyan)' }, // Bills & Utilities
  { key: '娯楽費', icon: FaGift, color: 'var(--purple)' }, // Entertainment
  { key: '衛生用品費', icon: FaMugHot, color: 'var(--pink)' }, // Personal Care
  { key: '医療費', icon: FaBriefcaseMedical, color: 'var(--brown)' }, // Healthcare
  { key: '税金', icon: FaCalculator, color: 'var(--primary)' }, // Taxes
  { key: '運動費', icon: FaDumbbell, color: 'var(--yellow)' }, // Fitness & Recreation
  { key: '旅行費', icon: FaSuitcase, color: 'var(--red)' }, // Travel
  { key: '教育費', icon: FaGraduationCap, color: 'var(--orange)' }, // Education
  { key: '折れ線グラフ', icon: FaChartLine, color: 'var(--yellow)' }, // Line Chart
  { key: '家具費', icon: FaCouch, color: 'var(--green)' }, // Furniture
  { key: 'ペット費', icon: FaPaw, color: 'var(--indigo)' }, // Pet Expenses
  { key: '電子機器', icon: FaMobileAlt, color: 'var(--blue)' }, // Electronics
  { key: '本', icon: FaBook, color: 'var(--cyan)' }, // Books
  { key: '音楽', icon: FaMusic, color: 'var(--purple)' }, // Music
  { key: '映画', icon: FaFilm, color: 'var(--pink)' }, // Movies
  { key: 'ゲーム', icon: FaGamepad, color: 'var(--brown)' }, // Games
  { key: 'スポーツ', icon: FaFootballBall, color: 'var(--primary)' }, // Sports
  { key: '美容', icon: FaSmile, color: 'var(--yellow)' }, // Beauty
  { key: '飲料', icon: FaWineGlassAlt, color: 'var(--red)' }, // Beverages
  { key: 'コーヒー', icon: FaCoffee, color: 'var(--orange)' }, // Coffee
  { key: 'お菓子', icon: FaCookie, color: 'var(--yellow)' }, // Snacks
  { key: '車両', icon: FaTruck, color: 'var(--green)' }, // Vehicles
  { key: '家具', icon: FaCouch, color: 'var(--indigo)' }, // Furniture
  { key: '家電', icon: FaTv, color: 'var(--blue)' }, // Appliances
  { key: 'ギフト', icon: FaGifts, color: 'var(--cyan)' }, // Gifts
  { key: 'ツール', icon: FaTools, color: 'var(--purple)' }, // Tools
  { key: '仕事', icon: FaBriefcase, color: 'var(--pink)' }, // Work
  { key: 'ハート', icon: FaHeart, color: 'var(--brown)' }, // Love
  { key: '旅行', icon: FaPlane, color: 'var(--primary)' }, // Travel
  { key: 'カメラ', icon: FaCamera, color: 'var(--yellow)' }, // Photography
  { key: 'クリスマス', icon: FaTree, color: 'var(--red)' }, // Christmas
  { key: 'ハロウィン', icon: FaGhost, color: 'var(--orange)' }, // Halloween
  { key: 'バースデー', icon: FaBirthdayCake, color: 'var(--yellow)' }, // Birthday
  { key: 'ハートのプレゼント', icon: FaHeartbeat, color: 'var(--green)' }, // Heart Gift
  { key: 'ハートのハンバーガー', icon: FaHamburger, color: 'var(--indigo)' }, // Heart Burger
  { key: 'ハートのピザ', icon: FaPizzaSlice, color: 'var(--blue)' }, // Heart Pizza
  { key: 'ハートのアイスクリーム', icon: FaIceCream, color: 'var(--cyan)' }, // Heart Ice Cream
  { key: 'ハートのコーヒー', icon: FaCoffee, color: 'var(--purple)' }, // Heart Coffee
  { key: 'ハートのお菓子', icon: FaCookie, color: 'var(--pink)' }, // Heart Cookie
  { key: 'ハートのケーキ', icon: FaBirthdayCake, color: 'var(--brown)' }, // Heart Cake
  { key: 'ハートのハロウィン', icon: FaGhost, color: 'var(--primary)' }, // Heart Halloween
  { key: 'ハートのクリスマス', icon: FaTree, color: 'var(--yellow)' }, // Heart Christmas
  { key: 'ハートのバースデー', icon: FaBirthdayCake, color: 'var(--red)' }, // Heart Birthday
];
