import { Link } from 'react-router-dom';
import { ICategory } from '../../model/category';
import './index.css';

interface ICategoryCardsProps {
  title: string; // title of the section
  categories: ICategory[];
}
export const CategoryCards: React.FC<ICategoryCardsProps> = ({ categories, title }) => {
  return (
    <>
      <h2 className="pl-3 pr-3 text-color">{title}</h2>
      <div className="white-space-nowrap overflow-x-auto">
        <div className="flex inline-block pb-2 mr-2">
          {categories.map((category, i) => (
            <div key={category.id} className="ml-3 mr-1">
              <Link to={`/search?categories=${category.id}`} className="text-color" style={{ textDecoration: 'none' }}>
                <CategoryCardItem category={category} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

interface ICategoryCardItemProps {
  category: ICategory;
}
export const CategoryCardItem: React.FC<ICategoryCardItemProps> = ({ category }) => {
  const imageUrl = category.image || '/images/categories/fallback.jpg';
  return (
    <div className="">
      <div className="category-card overflow-hidden border-round-2xl flex p-0 align-items-end shadow-2" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="white-space-normal text-primary p-2 w-full event-info border-round">
          <h3 className="m-0">{category.name}</h3>
        </div>
      </div>
    </div>
  );
};
