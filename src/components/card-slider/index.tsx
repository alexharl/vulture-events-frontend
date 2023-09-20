import { Link } from 'react-router-dom';
import './index.css';

interface ICardItem {
  id: string;
  href: string;
  title: string;
  imageUrl: string;
  subtitle?: string;
  content?: React.ReactNode;
}

interface ICardsProps {
  title: string;
  items: ICardItem[];
  variant?: 'big' | 'small';
}

export const CardSlider: React.FC<ICardsProps> = ({ items, title, variant }) => {
  return (
    <>
      <h2 className="pl-3 pr-3 text-color">{title}</h2>
      <div className="white-space-nowrap overflow-x-auto">
        <div className="flex inline-block pb-2">
          {items.map((item, i) => (
            <div key={item.id} className={'pr-3' + (i === 0 ? ' pl-3' : '')}>
              <Link to={item.href} className="text-color" style={{ textDecoration: 'none' }}>
                <div className={`overflow-hidden border-round-2xl flex p-0 align-items-end shadow-2 card card-${variant || 'big'}`} style={{ backgroundImage: `url(${item.imageUrl})` }}>
                  {item.content}
                  <div className="card-info white-space-normal text-primary p-2 w-full border-round">
                    <h3 className="m-0">{item.title}</h3>
                    {item.subtitle && <p className="m-0">{item.subtitle}</p>}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
