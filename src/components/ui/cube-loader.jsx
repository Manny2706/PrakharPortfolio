export default function CubeLoader() {
  return (
    <div className="cube-loader" aria-label="Loading">
      <div className="cube-loader-scene">
        <div className="cube-loader-cube">
          <div className="cube-loader-core" />

          <div className="cube-loader-side-wrapper cube-loader-front">
            <div className="cube-loader-face cube-loader-face-cyan" />
          </div>

          <div className="cube-loader-side-wrapper cube-loader-back">
            <div className="cube-loader-face cube-loader-face-cyan" />
          </div>

          <div className="cube-loader-side-wrapper cube-loader-right">
            <div className="cube-loader-face cube-loader-face-purple" />
          </div>

          <div className="cube-loader-side-wrapper cube-loader-left">
            <div className="cube-loader-face cube-loader-face-purple" />
          </div>

          <div className="cube-loader-side-wrapper cube-loader-top">
            <div className="cube-loader-face cube-loader-face-indigo" />
          </div>

          <div className="cube-loader-side-wrapper cube-loader-bottom">
            <div className="cube-loader-face cube-loader-face-indigo" />
          </div>
        </div>

        <div className="cube-loader-shadow" />
      </div>

      <div className="cube-loader-copy">
        <h3>Loading..</h3>
      </div>
    </div>
  );
}