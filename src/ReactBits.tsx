// ReactBits.tsx
import GlareHover from "./blocks/Animations/GlareHover/GlareHover";
import FlowingMenu from './blocks/Components/FlowingMenu/FlowingMenu';
import ProfileCard from './blocks/Components/ProfileCard/ProfileCard';

export default function GSAPBitsShowcase() {

  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    <div>
      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '600px'
          }}>
          <ProfileCard
            name="John Bugwriter"
            title="Software Engineer"
            handle="johncodes"
            status="Online"
            contactText="Contact Me"
            avatarUrl="https://i.imgur.com/HLK4giU.png"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => console.log('Contact clicked')}
          />
      </div>

      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu items={demoItems} />
      </div>

      <div style={{ height: '600px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <GlareHover
            height="250px"
            width="250px"
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
        >
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#333', margin: 0 }}>
            Swoosh!
            </h2>
        </GlareHover>
      </div>

  </div>
  );
}
