import './index.css';

export interface IEventDetailNotFoundProps {
  onBack?: () => void;
}

export const EventDetailNotFound: React.FC<IEventDetailNotFoundProps> = ({ onBack }) => {
  return (
    <div className="relative surface-ground">
      {onBack && (
        <button onClick={onBack} className="flex floating-back-button surface-ground border-circle align-items-center justify-content-center">
          <i className="pi pi-arrow-left"></i>
        </button>
      )}
      <div className="info-sheet">
        <div className="text-color border-round-top-xl surface-ground pb-4">
          <h4 className="text-center mt-0 pt-4 mb-2">Nicht gefunden</h4>
          <div className="pl-4 pr-4">
            <div className="flex pb-3">
              <i className="pi pi-calendar"></i>
              <div className="pl-4">
                <span>N/A</span>
              </div>
            </div>
            <div className="flex pb-3">
              <i className="pi pi-map-marker"></i>
              <div className="pl-4">N/A</div>
            </div>

            <div className="flex pb-3">
              <i className="pi pi-dollar"></i>
              <div className="pl-4">N/A</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
