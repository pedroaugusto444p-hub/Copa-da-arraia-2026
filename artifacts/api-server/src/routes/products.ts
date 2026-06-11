import { Router } from "express";

const router = Router();

const products = [
  {
    id: 1,
    name: "Acesso Essencial",
    description: "Ideal para quem quer apenas a base da apresentação gastando pouco.",
    price: "R$ 10,00",
    features: [
      "Coreografia Passo a Passo",
      "Roteiro de Ensaio Prático",
      "Cronograma Completo da Apresentação",
      "Acesso vitalício",
      "PDFs prontos para imprimir",
      "Acesso imediato por e-mail e WhatsApp",
      "Suporte básico",
      "Templates de roteiro prontos para imprimir",
      "Bônus Grátis: Cronograma de Ensaios da Quadrilha",
      "Bônus Grátis: Roteiro Detalhado do Início ao Fim",
      "Bônus Grátis: Guia do Marcador com Falas Prontas",
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: "Kit Completo 2026",
    description: "O Kit Completo 2026 é o mais escolhido. Bônus Exclusivos inclusos.",
    price: "R$ 29,90",
    features: [
      "Coreografia Passo a Passo",
      "Roteiro de Ensaio Prático",
      "Cronograma Completo da Apresentação",
      "Acesso vitalício",
      "PDFs prontos para imprimir",
      "Acesso imediato por e-mail e WhatsApp",
      "WhatsApp do suporte prioritário",
      "Templates prontos para imprimir",
      "Bônus Grátis: Roteiro de Ensaios da Quadrilha",
      "Bônus Grátis: Roteiro Detalhado do Início ao Fim",
      "Bônus Grátis: Guia do Marcador com Falas Prontas",
      'Bônus Exclusivo: Painel Gigante de Parede "Arraiá do Hexa" para Imprimir',
      "Bônus Exclusivo: Apostila Completa de Atividades Juninas Pedagógicas",
      "Bônus Exclusivo: Guia de Figurinos Criativos Verde e Amarelo para os Pais",
      "Bônus Exclusivo: Caderno de Jogos e Brincadeiras Juninas da Copa",
    ],
    isPopular: true,
  },
];

router.get("/products", (req, res) => {
  res.json(products);
});

export default router;
