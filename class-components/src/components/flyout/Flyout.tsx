import './flyout.css';
type FlyoutProps = {
  selectedItems: number;
};

export const Flyout = (props: FlyoutProps) => {
  return (
    <div className="flyout">
      <button className="searchPanel__btn">Unselect all</button>
      <p>Total: {props.selectedItems}</p>
      <button className="searchPanel__btn" disabled>
        Download
      </button>
    </div>
  );
};
