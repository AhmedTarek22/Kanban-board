/**
 *
 * @param {Object} props
 * @param {Object} props.item
 * @returns {JSX.Element}
 */

const Card = ({ item }) => {
  return (
    <div className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm">
      <h2 className="text-heading-m">{item.title}</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default Card;
