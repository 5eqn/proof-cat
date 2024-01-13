function getBackgroundColor(level: number, maxLevel: number) {
  // Divide the RGB range by the maximum level
  let rgbStep = 255 / maxLevel;
  // Subtract the RGB step from the maximum value for each component
  let rgb = 250 - rgbStep * level;
  // Return the RGB color as a string
  return `rgb(${rgb}, ${rgb}, ${rgb})`;
}

function getTagColor(level: number, period: number, offset: number) {
  // Divide the hue range by the maximum level
  let hueStep = 360 / period;
  // Multiply the hue step by the current level
  let hue = hueStep * ((level + offset) % period);
  // Return the HSL color as a string
  return `hsl(${hue}, 50%, 80%)`;
}

export default function Slot(props: {
  children: JSX.Element[] | JSX.Element,
  depth: number,
  tagged?: boolean,
}) {
  const tag = props.tagged ? <div style={{
    width: "4px",
    backgroundColor: getTagColor(props.depth, 5, 1),
  }} /> : <div />
  return <div style={{
    height: "24px",
    backgroundColor: getBackgroundColor(props.depth, 40),
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingRight: '8px',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
  }}>
    {tag}
    <div style={{
      paddingLeft: '8px',
      flexGrow: 1,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "stretch",
    }}>
      {props.children}
    </div>
  </div>
}
