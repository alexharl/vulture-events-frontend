import { TEventOrigin } from '../../model/event';

const originImageMap = {
  rakete: ['/images/locations/logo-rakete.png', 'black'],
  haus33: ['/images/locations/logo-haus33.png', 'black'],
  zbau: ['/images/locations/logo-zbau.png', 'white']
};

interface ILocationBadgeProps {
  origin: TEventOrigin;
}
export const LocationBadge: React.FC<ILocationBadgeProps> = ({ origin }) => {
  const r = originImageMap[origin];
  if (!r) return null;

  return (
    <div className="absolute border-round-left-2xl" style={{ top: '15px', right: '0px', width: '75px', height: '37px', backgroundColor: r[1] }}>
      <img className="w-full" src={r[0]} alt={`Logo ${origin}`} />
    </div>
  );
};
