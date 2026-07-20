import HeroSlider from '../components/home/HeroSlider';
import SpecificationDriven from '../components/home/SpecificationDriven';
import AboutSection from '../components/home/AboutSection';
import GlobalDemand from '../components/home/GlobalDemand';
import StaticMapSection from '../components/home/StaticMapSection';
import CrestaFoodsGroup from '../components/home/CrestaFoodsGroup';
import VideoSection from '../components/home/VideoSection';
import StatisticsSection from '../components/home/StatisticsSection';
import Certifications from '../components/home/Certifications';
import ManufacturingPlants from '../components/home/ManufacturingPlants';
import AlternativeSection from '../components/home/AlternativeSection';
import ContactCTA from '../components/home/ContactCTA';
import DynamicSections from '../components/DynamicSections';

const Home = () => {
  return (
    <>
      <title>Cresta Foods | Premium Guar Gum & Dehydrated Onion Exporters from India</title>
      <HeroSlider />
      <SpecificationDriven />
      
      <DynamicSections slotId="home_after_products" />
      <AboutSection />
      
      <DynamicSections slotId="home_after_about" />
      <StaticMapSection />
      
      <DynamicSections slotId="home_after_map" />
      <AlternativeSection />
      
      <DynamicSections slotId="home_after_alternative" />
      <VideoSection />
      
      <DynamicSections slotId="home_after_video" />
      <StatisticsSection />
      
      <DynamicSections slotId="home_after_stats" />
      <ManufacturingPlants />
      
      <DynamicSections slotId="home_after_plants" />
      <ContactCTA />
    </>
  );
};

export default Home;
