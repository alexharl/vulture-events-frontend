import { FC, useState } from 'react';
import { IEventQuery } from '../../model/query';
import { ICategory } from '../../model/category';
import { categories } from '../../common/categories';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';

interface ISearchFilterProps {
  query: IEventQuery;
  onQueryChange: (query: IEventQuery) => void;
}

export const SearchFilter: FC<ISearchFilterProps> = ({ query, onQueryChange }) => {
  const [searchText, setSearchText] = useState(query.text);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>(categories.filter(c => query.categories?.includes(c.id)));

  const panelFooterTemplate = () => {
    const length = selectedCategories ? selectedCategories.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> {length > 1 ? 'Kategorien' : 'Kategorie'} gewählt.
      </div>
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = () => {
    onQueryChange({ ...query, text: searchText, categories: selectedCategories.map(c => c.id) });
  };

  return (
    <div className="pl-3 pr-3">
      <div>
        <span className="p-input-icon-left w-full pt-2">
          <i className="pi pi-search" style={{ top: '58%' }} />
          <InputText className="p-inputtext-lg w-full" placeholder="Suche" name="search" value={searchText} onChange={e => setSearchText(e.target.value)} onKeyDown={handleKeyPress} />
        </span>
      </div>
      <div className="flex pt-2">
        <MultiSelect value={selectedCategories} options={categories} onChange={e => setSelectedCategories(e.value)} optionLabel="name" placeholder="Kategorien" panelFooterTemplate={panelFooterTemplate} className="w-full md:w-20rem" display="chip" />
      </div>
      <div className="flex justify-content-end pt-4">
        <Button rounded label="Filter" icon="pi pi-sliders-v" onClick={performSearch} />
      </div>
    </div>
  );
};
