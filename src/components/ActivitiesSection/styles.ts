import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: #f8fafc;
`;

export const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.75;
`;

export const CardsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Card = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const CardCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

export const CardLocation = styled.span`
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CardPrice = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #0369a1;
`; 