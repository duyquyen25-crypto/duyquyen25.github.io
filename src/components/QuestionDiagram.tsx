import React from 'react';
import {
  FunctionPlotDiagram,
  GeometryFigureDiagram,
  ProbTreeDiagram,
  QuestionDiagramSpec,
  VariationTableDiagram,
  VariationTableYNode,
} from '../types/math';
import { MathText } from './MathText';

interface QuestionDiagramProps {
  diagram?: QuestionDiagramSpec;
  compact?: boolean;
}

const posPercent = (pos: 'top' | 'mid' | 'bot'): number =>
  pos === 'top' ? 18 : pos === 'mid' ? 50 : 82;

const getRightSidePos = (node: VariationTableYNode): number =>
  node.kind === 'asymptote' ? posPercent(node.rightPos) : posPercent(node.pos);

const getLeftSidePos = (node: VariationTableYNode): number =>
  node.kind === 'asymptote' ? posPercent(node.leftPos) : posPercent(node.pos);

const VariationTableView: React.FC<{ diagram: VariationTableDiagram; compact?: boolean }> = ({
  diagram,
  compact = false,
}) => {
  const { xNodes, derivTokens, yNodes, derivLabel, funcLabel } = diagram;
  const intervalCount = Math.max(0, xNodes.length - 1);

  return (
    <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
      <div className="inline-block border border-slate-700 bg-white text-slate-900 rounded-sm overflow-x-auto max-w-full">
        {/* Row 1: x */}
        <div className="flex items-stretch border-b border-slate-700 text-xs sm:text-sm">
          <div className="w-16 sm:w-20 shrink-0 px-2 py-1.5 border-r border-slate-700 font-medium flex items-center justify-center bg-slate-50">
            <MathText text="$x$" />
          </div>
          <div className="flex items-center">
            {xNodes.map((xn, idx) => (
              <React.Fragment key={idx}>
                <div className="min-w-[54px] sm:min-w-[66px] px-1.5 py-1.5 text-center font-medium">
                  <MathText text={`$${xn}$`} />
                </div>
                {idx < intervalCount && (
                  <div className="w-10 sm:w-14 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2: y' or f'(x) */}
        <div
          className={`flex items-stretch text-xs sm:text-sm ${
            yNodes && funcLabel ? 'border-b border-slate-700' : ''
          }`}
        >
          <div className="w-16 sm:w-20 shrink-0 px-2 py-1.5 border-r border-slate-700 font-medium flex items-center justify-center bg-slate-50">
            <MathText text={`$${derivLabel}$`} />
          </div>
          <div className="flex items-stretch">
            {xNodes.map((_, idx) => {
              const isEndpoint = idx === 0 || idx === xNodes.length - 1;
              const nodeTok = !isEndpoint ? derivTokens[idx * 2 - 1] : undefined;
              const signTok = idx < intervalCount ? derivTokens[idx * 2] : undefined;
              return (
                <React.Fragment key={idx}>
                  <div className="min-w-[54px] sm:min-w-[66px] flex items-center justify-center relative py-1.5">
                    {!isEndpoint && nodeTok?.type === 'node' && nodeTok.kind === 'd' && (
                      <div className="flex gap-[3px] h-full items-stretch">
                        <span className="w-[1.5px] bg-slate-800 block min-h-[26px]" />
                        <span className="w-[1.5px] bg-slate-800 block min-h-[26px]" />
                      </div>
                    )}
                    {!isEndpoint && nodeTok?.type === 'node' && nodeTok.kind !== 'd' && (
                      <span className="font-mono text-xs sm:text-sm">0</span>
                    )}
                  </div>
                  {idx < intervalCount && (
                    <div
                      className="w-10 sm:w-14 shrink-0 flex items-center justify-center font-semibold text-sm"
                      style={
                        signTok?.type === 'sign' && signTok.value === 'hatched'
                          ? {
                              backgroundImage:
                                'repeating-linear-gradient(-45deg, transparent, transparent 4px, #cbd5e1 4px, #cbd5e1 5.5px)',
                            }
                          : undefined
                      }
                    >
                      {signTok?.type === 'sign' && signTok.value !== 'hatched' ? signTok.value : ''}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Row 3: y or f(x) */}
        {yNodes && funcLabel && yNodes.length === xNodes.length && (
          <div className="flex items-stretch text-xs sm:text-sm">
            <div className="w-16 sm:w-20 shrink-0 px-2 py-2 border-r border-slate-700 font-medium flex items-center justify-center bg-slate-50">
              <MathText text={`$${funcLabel}$`} />
            </div>
            <div className="flex items-stretch">
              {yNodes.map((yn, idx) => {
                const nextNode = idx < intervalCount ? yNodes[idx + 1] : null;
                const yStart = getRightSidePos(yn);
                const yEnd = nextNode ? getLeftSidePos(nextNode) : yStart;
                const arrowId = `vt-arr-${idx}-${Math.round(yStart)}-${Math.round(yEnd)}`;
                const intervalSign = derivTokens[idx * 2];
                const isHatched = intervalSign?.type === 'sign' && intervalSign.value === 'hatched';

                return (
                  <React.Fragment key={idx}>
                    <div className="min-w-[54px] sm:min-w-[66px] h-[92px] relative flex items-center justify-center px-1">
                      {yn.kind === 'asymptote' ? (
                        <>
                          <div className="flex gap-[3px] h-full">
                            <span className="w-[1.5px] bg-slate-800 block h-full" />
                            <span className="w-[1.5px] bg-slate-800 block h-full" />
                          </div>
                          <span
                            className="absolute right-[56%] whitespace-nowrap text-[11px] bg-white px-0.5"
                            style={{
                              top: yn.leftPos === 'top' ? '6px' : undefined,
                              bottom: yn.leftPos === 'bot' ? '6px' : undefined,
                            }}
                          >
                            <MathText text={`$${yn.leftVal}$`} />
                          </span>
                          <span
                            className="absolute left-[56%] whitespace-nowrap text-[11px] bg-white px-0.5"
                            style={{
                              top: yn.rightPos === 'top' ? '6px' : undefined,
                              bottom: yn.rightPos === 'bot' ? '6px' : undefined,
                            }}
                          >
                            <MathText text={`$${yn.rightVal}$`} />
                          </span>
                        </>
                      ) : (
                        <span
                          className="absolute whitespace-nowrap bg-white px-1 text-[11px] sm:text-xs"
                          style={{
                            top:
                              yn.pos === 'top'
                                ? '6px'
                                : yn.pos === 'mid'
                                ? '50%'
                                : undefined,
                            bottom: yn.pos === 'bot' ? '6px' : undefined,
                            transform: yn.pos === 'mid' ? 'translateY(-50%)' : undefined,
                          }}
                        >
                          <MathText text={`$${yn.value}$`} />
                        </span>
                      )}
                    </div>

                    {idx < intervalCount && nextNode && (
                      <div
                        className="w-10 sm:w-14 shrink-0 h-[92px] relative"
                        style={
                          isHatched
                            ? {
                                backgroundImage:
                                  'repeating-linear-gradient(-45deg, transparent, transparent 4px, #cbd5e1 4px, #cbd5e1 5.5px)',
                              }
                            : undefined
                        }
                      >
                        {!isHatched && (
                          <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="w-full h-full overflow-visible"
                          >
                            <defs>
                              <marker
                                id={arrowId}
                                viewBox="0 0 10 10"
                                refX="7"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                              >
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
                              </marker>
                            </defs>
                            <line
                              x1="8"
                              y1={yStart}
                              x2="90"
                              y2={yEnd}
                              stroke="#1e293b"
                              strokeWidth="1.6"
                              markerEnd={`url(#${arrowId})`}
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function evalDiagramCurve(diagram: FunctionPlotDiagram, x: number): number | null {
  const c = diagram.coeffs;
  if (diagram.curveType === 'cubic') {
    const [a = 0, b = 0, cc = 0, d = 0] = c;
    return a * x * x * x + b * x * x + cc * x + d;
  }
  const [a = 0, b = 0, cc = 0, d = 1, e = 0] = c;
  const denom = d * x + e;
  if (Math.abs(denom) < 1e-6) return null;
  return (a * x * x + b * x + cc) / denom;
}

const FunctionPlotView: React.FC<{ diagram: FunctionPlotDiagram; compact?: boolean }> = ({
  diagram,
  compact = false,
}) => {
  const {
    xMin,
    xMax,
    yMin,
    yMax,
    xTicks,
    yTicks,
    strokeColor = '#0f172a',
    verticalAsymptote,
    obliqueAsymptote,
    highlightPoints = [],
    curveLabel,
  } = diagram;

  const width = compact ? 270 : 320;
  const height = compact ? 220 : 250;
  const pad = 22;
  const plotW = width - pad * 2;
  const plotH = height - pad * 2;

  const mapX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * plotW;
  const mapY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * plotH;

  const buildBranchPaths = (startX: number, endX: number): string[] => {
    const steps = 160;
    const paths: string[] = [];
    let currentD = '';
    for (let i = 0; i <= steps; i++) {
      const x = startX + ((endX - startX) * i) / steps;
      const y = evalDiagramCurve(diagram, x);
      if (y === null || !Number.isFinite(y) || y < yMin - 4 || y > yMax + 4) {
        if (currentD) {
          paths.push(currentD);
          currentD = '';
        }
        continue;
      }
      const px = mapX(x).toFixed(2);
      const py = mapY(y).toFixed(2);
      currentD += currentD ? ` L ${px} ${py}` : `M ${px} ${py}`;
    }
    if (currentD) paths.push(currentD);
    return paths;
  };

  const curvePaths: string[] = [];
  if (diagram.curveType === 'polyline' && diagram.points && diagram.points.length >= 2) {
    const seg = diagram.points
      .map(([px, py], i) => `${i === 0 ? 'M' : 'L'} ${mapX(px).toFixed(2)} ${mapY(py).toFixed(2)}`)
      .join(' ');
    curvePaths.push(seg);
  } else if (verticalAsymptote !== undefined && verticalAsymptote > xMin && verticalAsymptote < xMax) {
    const eps = (xMax - xMin) * 0.015;
    curvePaths.push(...buildBranchPaths(xMin, verticalAsymptote - eps));
    curvePaths.push(...buildBranchPaths(verticalAsymptote + eps, xMax));
  } else {
    curvePaths.push(...buildBranchPaths(xMin, xMax));
  }

  // Integer grid lines
  const gridX: number[] = [];
  for (let gx = Math.ceil(xMin); gx <= Math.floor(xMax); gx++) gridX.push(gx);
  const gridY: number[] = [];
  for (let gy = Math.ceil(yMin); gy <= Math.floor(yMax); gy++) gridY.push(gy);

  const axisY = Math.min(Math.max(0, yMin), yMax);
  const axisX = Math.min(Math.max(0, xMin), xMax);
  const clipId = `plot-clip-${Math.abs(Math.round(xMin * 31 + yMax * 17 + (verticalAsymptote ?? 7) * 13))}`;

  return (
    <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="bg-white border border-slate-200 rounded select-none"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={pad} y={pad} width={plotW} height={plotH} />
          </clipPath>
          <marker
            id={`${clipId}-arr`}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
          </marker>
        </defs>

        {/* Grid */}
        {gridX.length <= 24 &&
          gridX.map((gx) => (
            <line
              key={`gx-${gx}`}
              x1={mapX(gx)}
              y1={pad}
              x2={mapX(gx)}
              y2={height - pad}
              stroke="#e2e8f0"
              strokeWidth="0.7"
            />
          ))}
        {gridY.length <= 24 &&
          gridY.map((gy) => (
            <line
              key={`gy-${gy}`}
              x1={pad}
              y1={mapY(gy)}
              x2={width - pad}
              y2={mapY(gy)}
              stroke="#e2e8f0"
              strokeWidth="0.7"
            />
          ))}

        {/* Axes */}
        <line
          x1={pad}
          y1={mapY(axisY)}
          x2={width - pad + 8}
          y2={mapY(axisY)}
          stroke="#334155"
          strokeWidth="1.2"
          markerEnd={`url(#${clipId}-arr)`}
        />
        <line
          x1={mapX(axisX)}
          y1={height - pad}
          x2={mapX(axisX)}
          y2={pad - 8}
          stroke="#334155"
          strokeWidth="1.2"
          markerEnd={`url(#${clipId}-arr)`}
        />
        <text x={width - pad + 4} y={mapY(axisY) + 12} fontSize="11" fontStyle="italic" fill="#0f172a">
          x
        </text>
        <text x={mapX(axisX) - 12} y={pad - 2} fontSize="11" fontStyle="italic" fill="#0f172a">
          y
        </text>
        <text x={mapX(axisX) - 11} y={mapY(axisY) + 12} fontSize="10" fontStyle="italic" fill="#334155">
          O
        </text>

        {/* Axis Ticks */}
        {xTicks
          .filter((t) => t !== 0 && t >= xMin && t <= xMax)
          .map((t) => (
            <g key={`xt-${t}`}>
              <line
                x1={mapX(t)}
                y1={mapY(axisY) - 3}
                x2={mapX(t)}
                y2={mapY(axisY) + 3}
                stroke="#334155"
                strokeWidth="1"
              />
              <text
                x={mapX(t)}
                y={mapY(axisY) + 13}
                textAnchor="middle"
                fontSize="10"
                fill="#334155"
              >
                {t}
              </text>
            </g>
          ))}

        {yTicks
          .filter((t) => t !== 0 && t >= yMin && t <= yMax)
          .map((t) => (
            <g key={`yt-${t}`}>
              <line
                x1={mapX(axisX) - 3}
                y1={mapY(t)}
                x2={mapX(axisX) + 3}
                y2={mapY(t)}
                stroke="#334155"
                strokeWidth="1"
              />
              <text
                x={mapX(axisX) - 6}
                y={mapY(t) + 3.5}
                textAnchor="end"
                fontSize="10"
                fill="#334155"
              >
                {t}
              </text>
            </g>
          ))}

        {/* Clipped Asymptotes & Curve */}
        <g clipPath={`url(#${clipId})`}>
          {verticalAsymptote !== undefined && (
            <line
              x1={mapX(verticalAsymptote)}
              y1={pad}
              x2={mapX(verticalAsymptote)}
              y2={height - pad}
              stroke="#64748b"
              strokeWidth="1.1"
              strokeDasharray="4 3"
            />
          )}
          {obliqueAsymptote && (
            <line
              x1={mapX(xMin)}
              y1={mapY(obliqueAsymptote.m * xMin + obliqueAsymptote.q)}
              x2={mapX(xMax)}
              y2={mapY(obliqueAsymptote.m * xMax + obliqueAsymptote.q)}
              stroke="#64748b"
              strokeWidth="1.1"
              strokeDasharray="4 3"
            />
          )}
          {curvePaths.map((d, idx) => (
            <path
              key={idx}
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {highlightPoints.map((pt, idx) => (
            <g key={`pt-${idx}`}>
              <line
                x1={mapX(pt.x)}
                y1={mapY(pt.y)}
                x2={mapX(pt.x)}
                y2={mapY(axisY)}
                stroke="#94a3b8"
                strokeWidth="0.9"
                strokeDasharray="2.5 2.5"
              />
              <line
                x1={mapX(pt.x)}
                y1={mapY(pt.y)}
                x2={mapX(axisX)}
                y2={mapY(pt.y)}
                stroke="#94a3b8"
                strokeWidth="0.9"
                strokeDasharray="2.5 2.5"
              />
              <circle cx={mapX(pt.x)} cy={mapY(pt.y)} r="2.6" fill={strokeColor} />
              {pt.label && (
                <text
                  x={mapX(pt.x) + (pt.x < (xMin + xMax) / 2 ? -5 : 5)}
                  y={pt.y >= 0 ? mapY(pt.y) - 7 : mapY(pt.y) + 13}
                  textAnchor={pt.x < (xMin + xMax) / 2 ? 'end' : 'start'}
                  fontSize="10.5"
                  fontWeight="600"
                  fontStyle="italic"
                  fill="#0f172a"
                >
                  {pt.label}
                </text>
              )}
            </g>
          ))}
        </g>

        {curveLabel && (
          <text
            x={width - pad - 4}
            y={pad + 12}
            textAnchor="end"
            fontSize="10"
            fontStyle="italic"
            fill={strokeColor}
          >
            {curveLabel}
          </text>
        )}
      </svg>
    </div>
  );
};

const GeometryFigureView: React.FC<{ diagram: GeometryFigureDiagram; compact?: boolean }> = ({
  diagram,
  compact = false,
}) => {
  const { figureType, params } = diagram;

  if (figureType === 'semicircle_rect') {
    const w = compact ? 250 : 290;
    const h = compact ? 150 : 170;
    const cx = w / 2;
    const cy = h - 26;
    const r = compact ? 84 : 96;
    const theta = (50 * Math.PI) / 180;
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`}
            fill="#f8fafc"
            stroke="#1e293b"
            strokeWidth="1.6"
          />
          <rect
            x={cx - dx}
            y={cy - dy}
            width={dx * 2}
            height={dy}
            fill="#bae6fd"
            fillOpacity="0.65"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <circle cx={cx} cy={cy} r="2.6" fill="#0f172a" />
          <circle cx={cx - dx} cy={cy} r="2.4" fill="#0f172a" />
          <circle cx={cx + dx} cy={cy} r="2.4" fill="#0f172a" />
          <text x={cx} y={cy + 15} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">O</text>
          <text x={cx - dx} y={cy + 15} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">A</text>
          <text x={cx + dx} y={cy + 15} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">B</text>
          <text x={cx + dx + 9} y={cy - dy - 2} textAnchor="start" fontSize="11" fontStyle="italic" fill="#0f172a">C</text>
          <text x={cx - dx - 9} y={cy - dy - 2} textAnchor="end" fontSize="11" fontStyle="italic" fill="#0f172a">D</text>
          <text x={cx + r * 0.56} y={cy - r * 0.72} fontSize="10" fill="#334155">
            R = {params.R}
          </text>
        </svg>
      </div>
    );
  }

  if (figureType === 'box_cut') {
    const widthLabel = params.W ?? 30;
    const lengthLabel = params.L ?? 70;
    const w = compact ? 330 : 380;
    const h = compact ? 155 : 175;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Hình a: Tấm bìa chữ nhật */}
          <g transform="translate(46, 22)">
            <rect x="0" y="0" width="145" height="90" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="0" y="0" width="26" height="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="119" y="0" width="26" height="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="0" y="64" width="26" height="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="119" y="64" width="26" height="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="26" y="26" width="93" height="38" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <text x="13" y="-4" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
            <text x="-5" y="16" textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
            <text x="132" y="-4" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
            <text x="150" y="16" textAnchor="start" fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
            <text x="13" y="100" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
            <text x="132" y="100" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
            <line x1="-22" y1="0" x2="-22" y2="90" stroke="#475569" strokeWidth="1" />
            <text x="-26" y="48" textAnchor="middle" fontSize="9.5" fill="#0f172a" transform="rotate(-90 -26 48)">
              {widthLabel} cm
            </text>
            <line x1="0" y1="112" x2="145" y2="112" stroke="#475569" strokeWidth="1" />
            <text x="72" y="124" textAnchor="middle" fontSize="9.5" fill="#0f172a">
              {lengthLabel} cm
            </text>
            <text x="72" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">a)</text>
          </g>
          {/* Hình b: Hộp không nắp 3D */}
          <g transform="translate(235, 32)">
            <polygon points="0,35 28,15 112,15 84,35" fill="#e0f2fe" fillOpacity="0.45" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="0" y1="35" x2="0" y2="80" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="84" y1="35" x2="84" y2="80" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="112" y1="15" x2="112" y2="60" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="28" y1="15" x2="28" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="84" y2="80" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="84" y1="80" x2="112" y2="60" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="0" y1="80" x2="28" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="28" y1="60" x2="112" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <text x="56" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">b)</text>
          </g>
        </svg>
      </div>
    );
  }

  if (figureType === 'square_box_cut') {
    const sideLabel = params.a ?? 21;
    const w = compact ? 310 : 350;
    const h = compact ? 150 : 170;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <g transform="translate(36, 18)">
            <rect x="0" y="0" width="104" height="104" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="0" y="0" width="22" height="22" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <rect x="82" y="0" width="22" height="22" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <rect x="0" y="82" width="22" height="22" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <rect x="82" y="82" width="22" height="22" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <rect x="22" y="22" width="60" height="60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <text x="11" y="-4" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#0f172a">x</text>
            <text x="-5" y="14" textAnchor="end" fontSize="9.5" fontStyle="italic" fill="#0f172a">x</text>
            <text x="93" y="-4" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#0f172a">x</text>
            <line x1="0" y1="118" x2="104" y2="118" stroke="#475569" strokeWidth="1" />
            <text x="52" y="131" textAnchor="middle" fontSize="9.5" fill="#0f172a">{sideLabel} cm</text>
          </g>
          <text x="166" y="76" textAnchor="middle" fontSize="14" fill="#334155">→</text>
          <g transform="translate(195, 36)">
            <polygon points="0,30 28,12 108,12 80,30" fill="#e0f2fe" fillOpacity="0.45" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="0" y1="30" x2="0" y2="78" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="80" y1="30" x2="80" y2="78" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="108" y1="12" x2="108" y2="60" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="28" y1="12" x2="28" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="78" x2="80" y2="78" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="80" y1="78" x2="108" y2="60" stroke="#0f172a" strokeWidth="1.3" />
            <line x1="0" y1="78" x2="28" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="28" y1="60" x2="108" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    );
  }

  if (figureType === 'hexagon_pyramid_cut') {
    const w = compact ? 240 : 270;
    const h = compact ? 200 : 220;
    const cx = w / 2;
    const cy = h / 2;
    const R = compact ? 74 : 84;
    const r = R * 0.42;
    // Outer D=0, E=60, F=120, A=180, B=240, C=300 (screen y flipped: use -sin)
    const outerLabels = ['D', 'E', 'F', 'A', 'B', 'C'];
    const outerPts = [0, 60, 120, 180, 240, 300].map((deg, idx) => {
      const rad = (deg * Math.PI) / 180;
      return {
        label: outerLabels[idx],
        x: cx + R * Math.cos(rad),
        y: cy - R * Math.sin(rad),
        lx: cx + (R + 12) * Math.cos(rad),
        ly: cy - (R + 12) * Math.sin(rad) + 3,
      };
    });
    const innerPts = [30, 90, 150, 210, 270, 330].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
    });
    const M = { x: (innerPts[2].x + innerPts[3].x) / 2, y: (innerPts[2].y + innerPts[3].y) / 2 };

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon
            points={outerPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
            fill="#f8fafc"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
          <polygon
            points={innerPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
            fill="#e0f2fe"
            fillOpacity="0.6"
            stroke="#0284c7"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          {[0, 1, 2].map((i) => (
            <line
              key={`diag-${i}`}
              x1={outerPts[i].x}
              y1={outerPts[i].y}
              x2={outerPts[i + 3].x}
              y2={outerPts[i + 3].y}
              stroke="#64748b"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}
          {/* Flaps connecting outer vertex k to adjacent inner vertices */}
          {[
            [3, 2], [3, 3],
            [4, 3], [4, 4],
            [5, 4], [5, 5],
            [0, 5], [0, 0],
            [1, 0], [1, 1],
            [2, 1], [2, 2],
          ].map(([oi, ii], idx) => (
            <line
              key={`flap-${idx}`}
              x1={outerPts[oi].x}
              y1={outerPts[oi].y}
              x2={innerPts[ii].x}
              y2={innerPts[ii].y}
              stroke="#0f172a"
              strokeWidth="1.1"
            />
          ))}
          <circle cx={cx} cy={cy} r="2.4" fill="#0f172a" />
          <text x={cx + 8} y={cy - 5} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <circle cx={M.x} cy={M.y} r="2.4" fill="#0284c7" />
          <text x={M.x - 10} y={M.y - 5} fontSize="10" fontStyle="italic" fill="#0284c7">M</text>
          {outerPts.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="2.2" fill="#0f172a" />
              <text x={p.lx} y={p.ly} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (figureType === 'lantern_frame') {
    const w = compact ? 320 : 360;
    const h = compact ? 155 : 175;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Flat wire frame */}
          <g transform="translate(22, 18)">
            <rect x="34" y="24" width="52" height="52" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="34" y1="24" x2="86" y2="76" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="34" y1="76" x2="86" y2="24" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <polyline points="34,24 6,112 86,76" fill="none" stroke="#d97706" strokeWidth="1.4" />
            <polyline points="86,24 114,112 34,76" fill="none" stroke="#0284c7" strokeWidth="1.4" />
            <text x="60" y="18" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#0f172a">x</text>
            <text x="27" y="22" fontSize="9.5" fontStyle="italic" fill="#0f172a">A</text>
            <text x="25" y="84" fontSize="9.5" fontStyle="italic" fill="#0f172a">B</text>
            <text x="89" y="84" fontSize="9.5" fontStyle="italic" fill="#0f172a">C</text>
            <text x="89" y="22" fontSize="9.5" fontStyle="italic" fill="#0f172a">D</text>
            <text x="2" y="124" fontSize="9.5" fontStyle="italic" fill="#d97706">S</text>
            <text x="112" y="124" fontSize="9.5" fontStyle="italic" fill="#0284c7">S</text>
          </g>
          <text x="172" y="84" textAnchor="middle" fontSize="14" fill="#334155">→</text>
          {/* 3D square pyramid S.ABCD */}
          <g transform="translate(200, 14)">
            {/* S=(64,14), A=(48,92), B=(18,122), C=(96,122), D=(126,92), O=(72,107) */}
            <polygon points="18,122 96,122 126,92 64,14" fill="#e0f2fe" fillOpacity="0.35" stroke="none" />
            <line x1="64" y1="14" x2="18" y2="122" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="64" y1="14" x2="96" y2="122" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="64" y1="14" x2="126" y2="92" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="18" y1="122" x2="96" y2="122" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="96" y1="122" x2="126" y2="92" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="64" y1="14" x2="48" y2="92" stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 3" />
            <line x1="48" y1="92" x2="18" y2="122" stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 3" />
            <line x1="48" y1="92" x2="126" y2="92" stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 3" />
            <line x1="48" y1="92" x2="96" y2="122" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="18" y1="122" x2="126" y2="92" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="64" y1="14" x2="72" y2="107" stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 3" />
            <text x="64" y="10" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">S</text>
            <text x="41" y="90" fontSize="9.5" fontStyle="italic" fill="#0f172a">A</text>
            <text x="10" y="128" fontSize="9.5" fontStyle="italic" fill="#0f172a">B</text>
            <text x="98" y="132" fontSize="9.5" fontStyle="italic" fill="#0f172a">C</text>
            <text x="130" y="94" fontSize="9.5" fontStyle="italic" fill="#0f172a">D</text>
            <text x="72" y="118" fontSize="9.5" fontStyle="italic" fill="#0f172a">O</text>
          </g>
        </svg>
      </div>
    );
  }

  if (figureType === 'shore_island_path' || figureType === 'power_island_path') {
    const L = params.L ?? 36;
    const hVal = params.h ?? 8;
    const isPower = figureType === 'power_island_path';
    const midLabel = isPower ? 'M' : 'D';
    const w = compact ? 290 : 330;
    const h = compact ? 155 : 175;
    // A=(36,120), M/D=(186,120), B=(264,120), C=(264,26)
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points="36,120 264,120 264,26" fill="#e0f2fe" fillOpacity="0.4" />
          <line x1="36" y1="120" x2="264" y2="120" stroke="#0f172a" strokeWidth="1.6" />
          <line x1="264" y1="120" x2="264" y2="26" stroke="#0f172a" strokeWidth="1.4" />
          <line x1="36" y1="120" x2="264" y2="26" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="186" y1="120" x2="264" y2="26" stroke="#0284c7" strokeWidth="1.8" />
          <line x1="36" y1="120" x2="186" y2="120" stroke="#d97706" strokeWidth="2.2" />
          <polyline points="256,120 256,112 264,112" fill="none" stroke="#475569" strokeWidth="1" />
          {[
            { x: 36, y: 120 },
            { x: 186, y: 120 },
            { x: 264, y: 120 },
            { x: 264, y: 26 },
          ].map((pt, idx) => (
            <circle key={idx} cx={pt.x} cy={pt.y} r="2.6" fill="#0f172a" />
          ))}
          <text x="34" y="135" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x="186" y="135" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">{midLabel}</text>
          <text x="266" y="135" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x="264" y="19" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={isPower ? 225 : 111} y="135" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#d97706">x</text>
          <text x="150" y="156" textAnchor="middle" fontSize="10" fill="#334155">{L} km</text>
          <line x1="36" y1="143" x2="264" y2="143" stroke="#64748b" strokeWidth="0.9" />
          <text x="276" y="76" textAnchor="start" fontSize="10" fill="#334155">{hVal} km</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'rect_pool_path') {
    const W = params.W ?? 411;
    const L = params.L ?? 717;
    const w = compact ? 290 : 330;
    const h = compact ? 155 : 175;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <rect x="44" y="28" width="232" height="106" fill="#e0f2fe" fillOpacity="0.6" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="44" y1="28" x2="196" y2="28" stroke="#d97706" strokeWidth="2.4" />
          <line x1="196" y1="28" x2="276" y2="134" stroke="#0284c7" strokeWidth="1.8" />
          <circle cx="44" cy="28" r="2.6" fill="#0f172a" />
          <circle cx="196" cy="28" r="2.6" fill="#d97706" />
          <circle cx="276" cy="28" r="2.6" fill="#0f172a" />
          <circle cx="276" cy="134" r="2.6" fill="#0f172a" />
          <circle cx="44" cy="134" r="2.6" fill="#0f172a" />
          <text x="36" y="24" textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x="196" y="20" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#d97706">X</text>
          <text x="282" y="24" fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x="282" y="139" fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x="36" y="139" textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">D</text>
          <text x="160" y="152" textAnchor="middle" fontSize="10" fill="#334155">{L} m</text>
          <text x="38" y="84" textAnchor="end" fontSize="10" fill="#334155">{W} m</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'two_poles_wire') {
    const h1 = params.h1 ?? 9;
    const h2 = params.h2 ?? 27;
    const L = params.L ?? 20;
    const w = compact ? 290 : 330;
    const h = compact ? 155 : 175;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1="26" y1="130" x2="304" y2="130" stroke="#78350f" strokeWidth="1.6" />
          {/* Short pole A=(64,130)->T1=(64,86), Tall pole B=(266,130)->T2=(266,24), Stake C=(132,130) */}
          <line x1="64" y1="130" x2="64" y2="86" stroke="#1d4ed8" strokeWidth="2.4" />
          <line x1="266" y1="130" x2="266" y2="24" stroke="#15803d" strokeWidth="2.4" />
          <line x1="132" y1="130" x2="64" y2="86" stroke="#dc2626" strokeWidth="1.6" />
          <line x1="132" y1="130" x2="266" y2="24" stroke="#d97706" strokeWidth="1.6" />
          <circle cx="64" cy="130" r="2.6" fill="#0f172a" />
          <circle cx="132" cy="130" r="2.8" fill="#dc2626" />
          <circle cx="266" cy="130" r="2.6" fill="#0f172a" />
          <text x="58" y="109" textAnchor="end" fontSize="10" fill="#1d4ed8">{h1} m</text>
          <text x="272" y="78" textAnchor="start" fontSize="10" fill="#15803d">{h2} m</text>
          <text x="132" y="143" textAnchor="middle" fontSize="9.5" fill="#0f172a">chốt</text>
          <text x="98" y="143" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#dc2626">x</text>
          <text x="165" y="162" textAnchor="middle" fontSize="10" fill="#334155">{L} m</text>
          <line x1="64" y1="150" x2="266" y2="150" stroke="#64748b" strokeWidth="0.9" />
        </svg>
      </div>
    );
  }

  if (figureType === 'trapezoid_square') {
    const a = params.a ?? 10;
    const p = params.p ?? 3;
    const q = params.q ?? 4;
    const w = compact ? 220 : 250;
    const h = compact ? 185 : 210;
    const x0 = 46;
    const y0 = 26;
    const s = compact ? 128 : 146;
    const nx = x0 + (p / a) * s;
    const py = y0 + (q / a) * s;
    const mx = x0;
    const my = y0 + s * 0.45;
    const qx = x0 + s * 0.62;
    const qy = y0 + s;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <rect x={x0} y={y0} width={s} height={s} fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
          <polygon
            points={`${mx},${my} ${nx},${y0} ${x0 + s},${py} ${qx},${qy}`}
            fill="#bae6fd"
            fillOpacity="0.6"
            stroke="#0284c7"
            strokeWidth="1.6"
          />
          {[
            { x: x0, y: y0, lbl: 'A', dx: -10, dy: -4 },
            { x: x0 + s, y: y0, lbl: 'B', dx: 10, dy: -4 },
            { x: x0 + s, y: y0 + s, lbl: 'C', dx: 10, dy: 12 },
            { x: x0, y: y0 + s, lbl: 'D', dx: -10, dy: 12 },
            { x: nx, y: y0, lbl: 'N', dx: 0, dy: -7 },
            { x: x0 + s, y: py, lbl: 'P', dx: 10, dy: 4 },
            { x: mx, y: my, lbl: 'M', dx: -11, dy: 4 },
            { x: qx, y: qy, lbl: 'Q', dx: 0, dy: 13 },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="2.2" fill="#0f172a" />
              <text x={pt.x + pt.dx} y={pt.y + pt.dy} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">
                {pt.lbl}
              </text>
            </g>
          ))}
          <text x={(x0 + nx) / 2} y={y0 - 6} textAnchor="middle" fontSize="9.5" fill="#d97706">
            {p} cm
          </text>
          <text x={x0 + s + 16} y={(y0 + py) / 2 + 3} textAnchor="start" fontSize="9.5" fill="#d97706">
            {q} cm
          </text>
        </svg>
      </div>
    );
  }

  if (figureType === 'semicircle_boat_path') {
    const R = params.R ?? 2;
    const w = compact ? 250 : 290;
    const h = compact ? 150 : 170;
    const cx = w / 2;
    const cy = h - 26;
    const r = compact ? 86 : 98;
    const theta = (60 * Math.PI) / 180;
    const qx = cx + r * Math.cos(theta);
    const qy = cy - r * Math.sin(theta);
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`}
            fill="#e0f2fe"
            fillOpacity="0.45"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
          <line x1={cx - r} y1={cy} x2={qx} y2={qy} stroke="#d97706" strokeWidth="1.8" />
          <path
            d={`M ${qx} ${qy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.4"
          />
          <circle cx={cx - r} cy={cy} r="2.6" fill="#0f172a" />
          <circle cx={cx} cy={cy} r="2.4" fill="#0f172a" />
          <circle cx={cx + r} cy={cy} r="2.6" fill="#0f172a" />
          <circle cx={qx} cy={qy} r="2.6" fill="#d97706" />
          <text x={cx - r} y={cy + 15} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">P</text>
          <text x={cx} y={cy + 15} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">O</text>
          <text x={cx + r} y={cy + 15} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">R</text>
          <text x={qx + 8} y={qy - 6} fontSize="11" fontStyle="italic" fill="#0f172a">Q</text>
          <text x={cx - r * 0.45} y={cy + 15} textAnchor="middle" fontSize="9.5" fill="#334155">R = {R} km</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'ladder_wall_prop') {
    const hVal = params.h ?? 4;
    const dVal = params.d ?? 0.5;
    const w = compact ? 260 : 300;
    const h = compact ? 165 : 185;
    // B=(54,140), A=(54,24), C=(244,140), H=(84,140), M=(84,72) -> slightly scaled for visibility
    const bx = 56;
    const by = h - 28;
    const ay = 26;
    const cx = w - 34;
    const hx = bx + 42;
    const my = ay + ((hx - bx) / (cx - bx)) * (by - ay);
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={bx} y1={ay - 6} x2={bx} y2={by} stroke="#475569" strokeWidth="3" />
          <line x1={bx - 12} y1={by} x2={cx + 14} y2={by} stroke="#78350f" strokeWidth="2.5" />
          <line x1={bx} y1={ay} x2={cx} y2={by} stroke="#d97706" strokeWidth="2.2" />
          <line x1={hx} y1={by} x2={hx} y2={my} stroke="#0284c7" strokeWidth="2.4" />
          <line x1={bx} y1={my} x2={hx} y2={my} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <polyline points={`${hx - 6},${by} ${hx - 6},${by - 6} ${hx},${by - 6}`} fill="none" stroke="#475569" strokeWidth="1" />
          <polyline points={`${bx + 6},${by} ${bx + 6},${by - 6} ${bx},${by - 6}`} fill="none" stroke="#475569" strokeWidth="1" />
          <text x={bx - 10} y={ay + 4} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x={bx - 8} y={by + 14} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x={cx + 6} y={by + 14} fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={hx} y={by + 14} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">H</text>
          <text x={hx + 7} y={my - 4} fontSize="10.5" fontStyle="italic" fill="#0f172a">M</text>
          <text x={bx - 8} y={(ay + by) / 2} textAnchor="end" fontSize="9.5" fill="#475569">Tường</text>
          <text x={hx + 5} y={(my + by) / 2 + 4} fontSize="9.5" fill="#0284c7">{String(hVal).replace('.', ',')} m</text>
          <text x={(bx + hx) / 2} y={by + 14} textAnchor="middle" fontSize="9.5" fill="#334155">{String(dVal).replace('.', ',')} m</text>
          <text x={(hx + cx) / 2 + 10} y={(my + by) / 2 - 4} fontSize="9.5" fill="#d97706">Thang</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'parabola_pond_bridge') {
    const a0 = params.a0 ?? 40;
    const b0 = params.b0 ?? 20;
    const xI = params.xI ?? 40;
    const yI = params.yI ?? 30;
    const R = params.R ?? 10;
    const w = compact ? 250 : 285;
    const h = compact ? 185 : 210;
    const padL = 36;
    const padB = 28;
    const padT = 20;
    const padR = 20;
    const maxW = Math.max(b0 * 2.5, xI + R + 12, 60);
    const maxH = Math.max(a0 + 18, yI + R + 12, 60);
    const scale = Math.min((w - padL - padR) / maxW, (h - padT - padB) / maxH);
    const mx = (x: number) => padL + x * scale;
    const my = (y: number) => h - padB - y * scale;
    // Build parabola y = a0 * (1 - (x/b0)^2) for x in [0, b0]
    const pts: string[] = [];
    for (let i = 0; i <= 24; i++) {
      const xv = (b0 * i) / 24;
      const yv = a0 * (1 - (xv / b0) * (xv / b0));
      pts.push(`${i === 0 ? 'M' : 'L'} ${mx(xv).toFixed(1)} ${my(yv).toFixed(1)}`);
    }
    const maxBoxX = maxW - 5;
    const maxBoxY = maxH - 5;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <rect x={mx(0)} y={my(maxBoxY)} width={maxBoxX * scale} height={maxBoxY * scale} fill="#e0f2fe" fillOpacity="0.4" stroke="#0f172a" strokeWidth="1.2" />
          <path
            d={`M ${mx(0)} ${my(0)} L ${mx(0)} ${my(a0)} ${pts.slice(1).join(' ')} Z`}
            fill="#ffffff"
            stroke="none"
          />
          <path d={pts.join(' ')} fill="none" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx={mx(xI)} cy={my(yI)} r={R * scale} fill="#bbf7d0" fillOpacity="0.7" stroke="#15803d" strokeWidth="1.5" />
          <circle cx={mx(xI)} cy={my(yI)} r="2.2" fill="#0f172a" />
          <line x1={mx(0)} y1={my(yI)} x2={mx(xI)} y2={my(yI)} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 3" />
          <line x1={mx(xI)} y1={my(0)} x2={mx(xI)} y2={my(yI)} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 3" />
          <text x={mx(0) - 8} y={my(0) + 10} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={mx(0) - 8} y={my(a0) + 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={mx(b0)} y={my(0) + 12} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={mx(maxBoxX)} y={my(0) + 12} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={mx(maxBoxX) + 6} y={my(maxBoxY) + 3} fontSize="10" fontStyle="italic" fill="#0f172a">D</text>
          <text x={mx(0) - 8} y={my(maxBoxY) + 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">E</text>
          <text x={mx(xI) + 5} y={my(yI) - 4} fontSize="10" fontStyle="italic" fill="#15803d">I</text>
          <text x={mx(b0 / 2)} y={my(0) + 12} textAnchor="middle" fontSize="8.5" fill="#334155">{b0}m</text>
          <text x={mx(xI / 2)} y={my(yI) - 4} textAnchor="middle" fontSize="8.5" fill="#334155">{xI}m</text>
          <text x={mx(xI) + 4} y={my(yI / 2)} fontSize="8.5" fill="#334155">{yI}m</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'box_3d') {
    const variant = params.variant ?? 0; // 0: ABCD.A1B1C1D1, 1: ABCD.A'B'C'D', 2: cube ABCD.A1B1C1D1, 3: cuboid ABCD.EFGH
    const isCube = variant === 2;
    const w = compact ? 235 : 265;
    const h = compact ? 168 : 188;
    const xSpan = isCube ? 86 : 118;
    const dxSkew = 34;
    const dySkew = 30;
    const boxH = isCube ? 78 : 74;
    // Bottom: A (back-left), B (front-left), C (front-right), D (back-right)
    const A = { x: isCube ? 76 : 62, y: h - 54 };
    const B = { x: A.x - dxSkew, y: A.y + dySkew };
    const C = { x: B.x + xSpan, y: B.y };
    const D = { x: A.x + xSpan, y: A.y };
    const A1 = { x: A.x, y: A.y - boxH };
    const B1 = { x: B.x, y: B.y - boxH };
    const C1 = { x: C.x, y: C.y - boxH };
    const D1 = { x: D.x, y: D.y - boxH };

    const renderLabel = (pt: { x: number; y: number }, dx: number, dy: number, base: string, sub?: string) => (
      <text x={pt.x + dx} y={pt.y + dy} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">
        {base}
        {sub ? <tspan dy="2.5" fontSize="7.5" fontStyle="normal">{sub}</tspan> : null}
      </text>
    );

    const topLabels: Array<{ pt: { x: number; y: number }; dx: number; dy: number; base: string; sub?: string }> =
      variant === 3
        ? [
            { pt: A1, dx: -11, dy: -4, base: 'E' },
            { pt: B1, dx: -11, dy: 2, base: 'F' },
            { pt: C1, dx: 11, dy: 2, base: 'G' },
            { pt: D1, dx: 11, dy: -4, base: 'H' },
          ]
        : variant === 1
        ? [
            { pt: A1, dx: -12, dy: -4, base: "A'" },
            { pt: B1, dx: -12, dy: 2, base: "B'" },
            { pt: C1, dx: 12, dy: 2, base: "C'" },
            { pt: D1, dx: 12, dy: -4, base: "D'" },
          ]
        : [
            { pt: A1, dx: -12, dy: -4, base: 'A', sub: '1' },
            { pt: B1, dx: -12, dy: 2, base: 'B', sub: '1' },
            { pt: C1, dx: 12, dy: 2, base: 'C', sub: '1' },
            { pt: D1, dx: 12, dy: -4, base: 'D', sub: '1' },
          ];

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon
            points={`${A1.x},${A1.y} ${B1.x},${B1.y} ${C1.x},${C1.y} ${D1.x},${D1.y}`}
            fill="#e0f2fe"
            fillOpacity="0.28"
            stroke="none"
          />
          {/* Hidden edges */}
          <line x1={B.x} y1={B.y} x2={A.x} y2={A.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={A.x} y1={A.y} x2={A1.x} y2={A1.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          {/* Visible edges */}
          <polygon
            points={`${A1.x},${A1.y} ${B1.x},${B1.y} ${C1.x},${C1.y} ${D1.x},${D1.y}`}
            fill="none"
            stroke="#0f172a"
            strokeWidth="1.4"
          />
          <polyline
            points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
            fill="none"
            stroke="#0f172a"
            strokeWidth="1.4"
          />
          <line x1={B.x} y1={B.y} x2={B1.x} y2={B1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={C.x} y1={C.y} x2={C1.x} y2={C1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={D.x} y1={D.y} x2={D1.x} y2={D1.y} stroke="#0f172a" strokeWidth="1.4" />
          {[A, B, C, D, A1, B1, C1, D1].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2" fill="#0f172a" />
          ))}
          {renderLabel(A, -11, 2, 'A')}
          {renderLabel(B, -11, 11, 'B')}
          {renderLabel(C, 11, 11, 'C')}
          {renderLabel(D, 11, 2, 'D')}
          {topLabels.map((lbl, idx) => (
            <React.Fragment key={idx}>
              {renderLabel(lbl.pt, lbl.dx, lbl.dy, lbl.base, lbl.sub)}
            </React.Fragment>
          ))}
        </svg>
      </div>
    );
  }

  if (figureType === 'reg_tetra_3d') {
    const apexLbl = (params.apexVariant ?? 0) === 0 ? 'S' : 'A';
    const w = compact ? 225 : 255;
    const h = compact ? 168 : 188;
    const B = { x: 46, y: h - 58 };
    const C = { x: 102, y: h - 20 };
    const D = { x: w - 42, y: h - 58 };
    const S = { x: 106, y: 24 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={`${S.x},${S.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#e0f2fe" fillOpacity="0.28" />
          <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <polyline points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="none" stroke="#0f172a" strokeWidth="1.45" />
          <line x1={S.x} y1={S.y} x2={B.x} y2={B.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={S.x} y1={S.y} x2={C.x} y2={C.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={S.x} y1={S.y} x2={D.x} y2={D.y} stroke="#0f172a" strokeWidth="1.45" />
          {[S, B, C, D].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2.2" fill="#0f172a" />
          ))}
          <text x={S.x} y={S.y - 7} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">{apexLbl}</text>
          <text x={B.x - 10} y={B.y + 4} textAnchor="end" fontSize="11" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x} y={C.y + 13} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">C</text>
          <text x={D.x + 10} y={D.y + 4} textAnchor="start" fontSize="11" fontStyle="italic" fill="#0f172a">D</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'pyramid_perp_base_3d') {
    const variant = params.variant ?? 0; // 0: SA perp (ABC), 1: trihedral perp at S
    const w = compact ? 235 : 265;
    const h = compact ? 172 : 192;
    if (variant === 1) {
      const S = { x: 48, y: h - 68 };
      const C = { x: 48, y: 24 };
      const B = { x: w - 38, y: h - 68 };
      const A = { x: 98, y: h - 22 };
      const M = { x: (C.x + A.x) / 2, y: (C.y + A.y) / 2 };
      const H = { x: (B.x + M.x) / 2, y: (B.y + M.y) / 2 };
      return (
        <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
            <line x1={S.x} y1={S.y} x2={B.x} y2={B.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
            <line x1={S.x} y1={S.y} x2={M.x} y2={M.y} stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3.5 3" />
            <line x1={S.x} y1={S.y} x2={H.x} y2={H.y} stroke="#d97706" strokeWidth="1.4" strokeDasharray="3.5 3" />
            <polygon points={`${S.x},${S.y} ${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke="#0f172a" strokeWidth="1.45" />
            <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="#0f172a" strokeWidth="1.45" />
            <line x1={B.x} y1={B.y} x2={M.x} y2={M.y} stroke="#0284c7" strokeWidth="1.35" />
            <polyline points={`${S.x},${S.y - 8} ${S.x + 8},${S.y - 8} ${S.x + 8},${S.y}`} fill="none" stroke="#475569" strokeWidth="1" />
            {[S, A, B, C, M, H].map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r="2.2" fill={idx >= 4 ? '#0284c7' : '#0f172a'} />
            ))}
            <text x={S.x - 10} y={S.y + 4} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">S</text>
            <text x={A.x} y={A.y + 13} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
            <text x={B.x + 10} y={B.y + 4} textAnchor="start" fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
            <text x={C.x} y={C.y - 7} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
            <text x={M.x - 10} y={M.y + 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0284c7">M</text>
            <text x={H.x + 4} y={H.y - 7} fontSize="10" fontStyle="italic" fill="#d97706">H</text>
          </svg>
        </div>
      );
    }
    const A = { x: 48, y: h - 56 };
    const B = { x: 102, y: h - 20 };
    const C = { x: w - 38, y: h - 56 };
    const S = { x: 48, y: 24 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <polyline points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke="#0f172a" strokeWidth="1.45" />
          <line x1={S.x} y1={S.y} x2={A.x} y2={A.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={S.x} y1={S.y} x2={B.x} y2={B.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={S.x} y1={S.y} x2={C.x} y2={C.y} stroke="#0f172a" strokeWidth="1.45" />
          <polyline points={`${A.x},${A.y - 8} ${A.x + 8},${A.y - 8} ${A.x + 8},${A.y}`} fill="none" stroke="#475569" strokeWidth="1" />
          {[S, A, B, C].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2.2" fill="#0f172a" />
          ))}
          <text x={S.x} y={S.y - 7} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">S</text>
          <text x={A.x - 10} y={A.y + 4} textAnchor="end" fontSize="11" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x} y={B.y + 13} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 10} y={C.y + 4} textAnchor="start" fontSize="11" fontStyle="italic" fill="#0f172a">C</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'lamp_3cables_3d') {
    const w = compact ? 235 : 265;
    const h = compact ? 175 : 195;
    const A = { x: 46, y: 42 };
    const B = { x: 142, y: 24 };
    const C = { x: w - 42, y: 46 };
    const O = { x: w / 2 - 4, y: 110 };
    const L = { x: O.x, y: 144 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <polyline points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke="#0f172a" strokeWidth="1.35" />
          <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={O.x} y1={O.y} x2={L.x} y2={L.y} stroke="#0f172a" strokeWidth="1.5" />
          {/* Decorative lamp */}
          <circle cx={L.x} cy={L.y + 12} r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1.4" />
          <circle cx={L.x} cy={L.y + 12} r="9" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
          {[A, B, C, O].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2.2" fill="#0f172a" />
          ))}
          <text x={A.x - 10} y={A.y + 2} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x} y={B.y - 7} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 10} y={C.y + 2} textAnchor="start" fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={O.x - 11} y={O.y + 4} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">O</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'crane_car_frame_3d') {
    const w = compact ? 270 : 305;
    const h = compact ? 195 : 218;
    const E = { x: w / 2, y: 22 };
    const A = { x: 64, y: 92 };
    const B = { x: 112, y: 110 };
    const C = { x: w - 60, y: 84 };
    const D = { x: w - 108, y: 68 };
    const baseY = h - 28;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Base platform */}
          <polygon points={`46,${baseY} ${w - 70},${baseY} ${w - 36},${baseY - 18} 80,${baseY - 18}`} fill="#e2e8f0" stroke="#334155" strokeWidth="1.2" />
          {/* Car silhouette */}
          <path
            d={`M 98 ${baseY - 10} Q 108 ${baseY - 36} 135 ${baseY - 40} L 178 ${baseY - 40} Q 198 ${baseY - 38} 214 ${baseY - 22} L 222 ${baseY - 10} Z`}
            fill="#3b82f6"
            stroke="#1e3a8a"
            strokeWidth="1.1"
          />
          <circle cx={124} cy={baseY - 10} r="7.5" fill="#0f172a" />
          <circle cx={196} cy={baseY - 10} r="7.5" fill="#0f172a" />
          {/* Vertical hangers */}
          <line x1={A.x} y1={A.y} x2={A.x} y2={baseY - 6} stroke="#1d4ed8" strokeWidth="1.3" />
          <line x1={B.x} y1={B.y} x2={B.x} y2={baseY} stroke="#1d4ed8" strokeWidth="1.3" />
          <line x1={C.x} y1={C.y} x2={C.x} y2={baseY - 12} stroke="#1d4ed8" strokeWidth="1.3" />
          <line x1={D.x} y1={D.y} x2={D.x} y2={baseY - 18} stroke="#1d4ed8" strokeWidth="1.3" />
          {/* Top rectangle ABCD */}
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
          {/* 4 cables to hook E */}
          {[A, B, C, D].map((p, idx) => (
            <line key={idx} x1={E.x} y1={E.y} x2={p.x} y2={p.y} stroke="#0284c7" strokeWidth="1.35" />
          ))}
          {/* Crane hook E */}
          <rect x={E.x - 6} y={E.y - 12} width="12" height="9" rx="1.5" fill="#eab308" stroke="#713f12" strokeWidth="1" />
          <circle cx={E.x} cy={E.y} r="3" fill="#0f172a" />
          <text x={E.x - 12} y={E.y + 3} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#1e40af">E</text>
          <text x={A.x - 10} y={A.y + 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#1e40af">A</text>
          <text x={B.x - 6} y={B.y + 12} textAnchor="end" fontSize="10" fontStyle="italic" fill="#1e40af">B</text>
          <text x={C.x + 10} y={C.y + 4} textAnchor="start" fontSize="10" fontStyle="italic" fill="#1e40af">C</text>
          <text x={D.x - 6} y={D.y - 5} textAnchor="end" fontSize="10" fontStyle="italic" fill="#1e40af">D</text>
          <text x={(E.x + A.x) / 2 - 14} y={(E.y + A.y) / 2} fontSize="9.5" fontStyle="italic" fill="#0284c7">F₁</text>
          <text x={(E.x + B.x) / 2 - 10} y={(E.y + B.y) / 2 + 12} fontSize="9.5" fontStyle="italic" fill="#0284c7">F₂</text>
          <text x={(E.x + C.x) / 2 + 8} y={(E.y + C.y) / 2} fontSize="9.5" fontStyle="italic" fill="#0284c7">F₃</text>
          <text x={(E.x + D.x) / 2 + 8} y={(E.y + D.y) / 2 - 4} fontSize="9.5" fontStyle="italic" fill="#0284c7">F₄</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'chandelier_4chains_3d') {
    const w = compact ? 235 : 265;
    const h = compact ? 180 : 200;
    const S = { x: w / 2, y: 26 };
    const cy = h - 38;
    const rx = 74;
    const ry = 16;
    const A = { x: S.x - rx, y: cy };
    const C = { x: S.x + rx, y: cy };
    const B = { x: S.x + 22, y: cy - ry + 3 };
    const D = { x: S.x - 24, y: cy + ry - 3 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <rect x={S.x - 16} y={S.y - 10} width="32" height="9" rx="3" fill="#a16207" stroke="#713f12" strokeWidth="1" />
          <ellipse cx={S.x} cy={cy} rx={rx} ry={ry} fill="#fed7aa" stroke="#c2410c" strokeWidth="1.6" />
          {[A, B, C, D].map((p, idx) => (
            <line key={idx} x1={S.x} y1={S.y} x2={p.x} y2={p.y} stroke="#b45309" strokeWidth="1.5" strokeDasharray="3.5 2.5" />
          ))}
          {[S, A, B, C, D].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2.4" fill="#7c2d12" />
          ))}
          <text x={S.x - 16} y={S.y - 12} fontSize="10.5" fontStyle="italic" fill="#0f172a">S</text>
          <text x={A.x - 11} y={A.y + 4} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x + 8} y={B.y - 5} fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 11} y={C.y + 4} textAnchor="start" fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={D.x} y={D.y + 14} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">D</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'three_perp_forces_3d') {
    const w = compact ? 225 : 255;
    const h = compact ? 168 : 188;
    const O = { x: 96, y: 102 };
    const F1 = { x: O.x, y: 24 };
    const F2 = { x: O.x + 92, y: O.y };
    const F3 = { x: O.x - 56, y: O.y + 48 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Right angle markers at O */}
          <polyline points={`${O.x},${O.y - 12} ${O.x + 12},${O.y - 12} ${O.x + 12},${O.y}`} fill="none" stroke="#64748b" strokeWidth="1" />
          <polyline points={`${O.x - 10},${O.y + 8.5} ${O.x - 10},${O.y - 3.5} ${O.x},${O.y - 12}`} fill="none" stroke="#64748b" strokeWidth="1" />
          <polyline points={`${O.x + 12},${O.y} ${O.x + 2},${O.y + 8.5} ${O.x - 10},${O.y + 8.5}`} fill="none" stroke="#64748b" strokeWidth="1" />
          {/* Axes & arrowheads */}
          <line x1={O.x} y1={O.y} x2={F1.x} y2={F1.y} stroke="#0f172a" strokeWidth="1.6" />
          <polygon points={`${F1.x},${F1.y - 4} ${F1.x - 4},${F1.y + 4} ${F1.x + 4},${F1.y + 4}`} fill="#0f172a" />
          <line x1={O.x} y1={O.y} x2={F2.x} y2={F2.y} stroke="#0f172a" strokeWidth="1.6" />
          <polygon points={`${F2.x + 4},${F2.y} ${F2.x - 4},${F2.y - 4} ${F2.x - 4},${F2.y + 4}`} fill="#0f172a" />
          <line x1={O.x} y1={O.y} x2={F3.x} y2={F3.y} stroke="#0f172a" strokeWidth="1.6" />
          <polygon points={`${F3.x - 3},${F3.y + 2.5} ${F3.x - 1},${F3.y - 5} ${F3.x + 5},${F3.y}`} fill="#0f172a" />
          <circle cx={O.x} cy={O.y} r="2.2" fill="#0f172a" />
          <text x={O.x - 10} y={O.y - 6} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={F1.x - 10} y={(O.y + F1.y) / 2} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0284c7">F₁</text>
          <text x={(O.x + F2.x) / 2} y={F2.y - 7} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0284c7">F₂</text>
          <text x={(O.x + F3.x) / 2 - 12} y={(O.y + F3.y) / 2} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0284c7">F₃</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'cuboid_axes_vertex_3d') {
    const variant = params.variant ?? 0; // 0: A'B'C'D', 1: A1B1C1D1
    const w = compact ? 255 : 290;
    const h = compact ? 190 : 214;
    const A = { x: 86, y: h - 54 };
    const B = { x: 52, y: h - 28 };
    const C = { x: 164, y: h - 28 };
    const D = { x: 198, y: h - 54 };
    const boxH = 74;
    const A1 = { x: A.x, y: A.y - boxH };
    const B1 = { x: B.x, y: B.y - boxH };
    const C1 = { x: C.x, y: C.y - boxH };
    const D1 = { x: D.x, y: D.y - boxH };
    const xEnd = { x: 18, y: h - 2 };
    const yEnd = { x: w - 20, y: A.y };
    const zEnd = { x: A.x, y: 16 };
    const renderTop = (pt: { x: number; y: number }, dx: number, dy: number, base: string, sub?: string) => (
      <text x={pt.x + dx} y={pt.y + dy} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">
        {base}
        {sub ? <tspan dy="2.5" fontSize="7.5" fontStyle="normal">{sub}</tspan> : null}
      </text>
    );
    const tSub = variant === 1 ? '1' : undefined;
    const tName = (ch: string) => (variant === 1 ? ch : `${ch}'`);
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Hidden axis segments & cuboid back edges */}
          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={A.x} y1={A.y} x2={A1.x} y2={A1.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          {/* Right-angle symbols at origin A */}
          <polyline points={`${A.x},${A.y - 9} ${A.x + 9},${A.y - 9} ${A.x + 9},${A.y}`} fill="none" stroke="#475569" strokeWidth="0.95" />
          <polyline points={`${A.x + 11},${A.y} ${A.x + 2},${A.y + 7} ${A.x - 9},${A.y + 7}`} fill="none" stroke="#475569" strokeWidth="0.95" />
          {/* Visible cuboid edges */}
          <polygon points={`${A1.x},${A1.y} ${B1.x},${B1.y} ${C1.x},${C1.y} ${D1.x},${D1.y}`} fill="#e0f2fe" fillOpacity="0.22" stroke="#0f172a" strokeWidth="1.4" />
          <polyline points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="none" stroke="#0f172a" strokeWidth="1.4" />
          <line x1={B.x} y1={B.y} x2={B1.x} y2={B1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={C.x} y1={C.y} x2={C1.x} y2={C1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={D.x} y1={D.y} x2={D1.x} y2={D1.y} stroke="#0f172a" strokeWidth="1.4" />
          {/* Extending coordinate rays Ox, Oy, Oz */}
          <line x1={B.x} y1={B.y} x2={xEnd.x} y2={xEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <polygon points={`${xEnd.x - 3},${xEnd.y + 2} ${xEnd.x + 5},${xEnd.y + 1} ${xEnd.x},${xEnd.y - 5}`} fill="#0284c7" />
          <line x1={D.x} y1={D.y} x2={yEnd.x} y2={yEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <polygon points={`${yEnd.x + 4},${yEnd.y} ${yEnd.x - 3},${yEnd.y - 3.5} ${yEnd.x - 3},${yEnd.y + 3.5}`} fill="#0284c7" />
          <line x1={A1.x} y1={A1.y} x2={zEnd.x} y2={zEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <polygon points={`${zEnd.x},${zEnd.y - 4} ${zEnd.x - 3.5},${zEnd.y + 3} ${zEnd.x + 3.5},${zEnd.y + 3}`} fill="#0284c7" />
          {[A, B, C, D, A1, B1, C1, D1].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2" fill="#0f172a" />
          ))}
          <text x={A.x - 8} y={A.y - 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0284c7">O ≡ A</text>
          <text x={B.x - 10} y={B.y + 2} textAnchor="end" fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 9} y={C.y + 10} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={D.x + 6} y={D.y - 6} fontSize="10.5" fontStyle="italic" fill="#0f172a">D</text>
          {renderTop(A1, -12, -2, tName('A'), tSub)}
          {renderTop(B1, -11, 2, tName('B'), tSub)}
          {renderTop(C1, 11, 3, tName('C'), tSub)}
          {renderTop(D1, 11, -3, tName('D'), tSub)}
          <text x={xEnd.x + 8} y={xEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#0284c7">x</text>
          <text x={yEnd.x + 2} y={yEnd.y - 7} fontSize="10.5" fontStyle="italic" fill="#0284c7">y</text>
          <text x={zEnd.x + 8} y={zEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#0284c7">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'cube_axes_center_3d') {
    const w = compact ? 255 : 290;
    const h = compact ? 200 : 225;
    const P = { x: w / 2, y: h - 54 };
    const u = { x: -54, y: 20 };
    const v = { x: 64, y: 18 };
    const boxH = 82;
    const A = { x: P.x - v.x, y: P.y - v.y };
    const B = { x: P.x + u.x, y: P.y + u.y };
    const C = { x: P.x + v.x, y: P.y + v.y };
    const D = { x: P.x - u.x, y: P.y - u.y };
    const P1 = { x: P.x, y: P.y - boxH };
    const A1 = { x: A.x, y: A.y - boxH };
    const B1 = { x: B.x, y: B.y - boxH };
    const C1 = { x: C.x, y: C.y - boxH };
    const D1 = { x: D.x, y: D.y - boxH };
    const xEnd = { x: P.x + u.x * 1.55, y: P.y + u.y * 1.55 };
    const yEnd = { x: P.x + v.x * 1.55, y: P.y + v.y * 1.55 };
    const zEnd = { x: P1.x, y: 14 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Hidden edges & bottom diagonals & vertical internal axis */}
          <line x1={B.x} y1={B.y} x2={A.x} y2={A.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={A.x} y1={A.y} x2={A1.x} y2={A1.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#94a3b8" strokeWidth="1.05" strokeDasharray="3 2.5" />
          <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#94a3b8" strokeWidth="1.05" strokeDasharray="3 2.5" />
          <line x1={P.x} y1={P.y} x2={P1.x} y2={P1.y} stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 2.5" />
          {/* Top face & top diagonals */}
          <polygon points={`${A1.x},${A1.y} ${B1.x},${B1.y} ${C1.x},${C1.y} ${D1.x},${D1.y}`} fill="#e0f2fe" fillOpacity="0.22" stroke="#0f172a" strokeWidth="1.4" />
          <line x1={A1.x} y1={A1.y} x2={C1.x} y2={C1.y} stroke="#64748b" strokeWidth="1.05" strokeDasharray="3 2.5" />
          <line x1={B1.x} y1={B1.y} x2={D1.x} y2={D1.y} stroke="#64748b" strokeWidth="1.05" strokeDasharray="3 2.5" />
          {/* Visible cube edges */}
          <polyline points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="none" stroke="#0f172a" strokeWidth="1.4" />
          <line x1={B.x} y1={B.y} x2={B1.x} y2={B1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={C.x} y1={C.y} x2={C1.x} y2={C1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={D.x} y1={D.y} x2={D1.x} y2={D1.y} stroke="#0f172a" strokeWidth="1.4" />
          {/* Extending rays x, y, z */}
          <line x1={B.x} y1={B.y} x2={xEnd.x} y2={xEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <polygon points={`${xEnd.x - 4},${xEnd.y + 1.5} ${xEnd.x + 4},${xEnd.y + 2.5} ${xEnd.x + 1.5},${xEnd.y - 4.5}`} fill="#0284c7" />
          <line x1={C.x} y1={C.y} x2={yEnd.x} y2={yEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <polygon points={`${yEnd.x + 4},${yEnd.y + 1} ${yEnd.x - 2},${yEnd.y - 4} ${yEnd.x - 4},${yEnd.y + 2.5}`} fill="#0284c7" />
          <line x1={P1.x} y1={P1.y} x2={zEnd.x} y2={zEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <polygon points={`${zEnd.x},${zEnd.y - 4} ${zEnd.x - 3.5},${zEnd.y + 3} ${zEnd.x + 3.5},${zEnd.y + 3}`} fill="#0284c7" />
          {[A, B, C, D, A1, B1, C1, D1, P, P1].map((pt, idx) => (
            <circle key={idx} cx={pt.x} cy={pt.y} r={idx >= 8 ? 2.4 : 1.9} fill={idx >= 8 ? '#0284c7' : '#0f172a'} />
          ))}
          <text x={A.x - 10} y={A.y + 2} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x - 8} y={B.y + 12} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 8} y={C.y + 12} fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={D.x + 9} y={D.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">D</text>
          <text x={A1.x - 10} y={A1.y - 2} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">A'</text>
          <text x={B1.x - 10} y={B1.y + 2} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">B'</text>
          <text x={C1.x + 9} y={C1.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">C'</text>
          <text x={D1.x + 9} y={D1.y - 2} fontSize="10" fontStyle="italic" fill="#0f172a">D'</text>
          <text x={P.x + 4} y={P.y + 13} fontSize="9.5" fontStyle="italic" fill="#0284c7">O ≡ P</text>
          <text x={P1.x + 7} y={P1.y - 5} fontSize="9.5" fontStyle="italic" fill="#0284c7">P'</text>
          <text x={xEnd.x + 6} y={xEnd.y + 10} fontSize="10.5" fontStyle="italic" fill="#0284c7">x</text>
          <text x={yEnd.x - 6} y={yEnd.y + 11} fontSize="10.5" fontStyle="italic" fill="#0284c7">y</text>
          <text x={zEnd.x + 8} y={zEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#0284c7">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'airport_plane_3d') {
    const w = compact ? 275 : 310;
    const h = compact ? 200 : 224;
    const alpha = params.alpha ?? 59;
    const beta = params.beta ?? 44;
    const O = { x: 108, y: h - 54 };
    const A = { x: 64, y: h - 22 };
    const B = { x: 210, y: O.y };
    const H = { x: 166, y: h - 22 };
    const C = { x: O.x, y: 54 };
    const P = { x: H.x, y: H.y - (O.y - C.y) };
    const xEnd = { x: 28, y: h + 2 };
    const yEnd = { x: w - 20, y: O.y };
    const zEnd = { x: O.x, y: 18 };
    const iPt = { x: O.x + (A.x - O.x) * 0.42, y: O.y + (A.y - O.y) * 0.42 };
    const jPt = { x: O.x + (B.x - O.x) * 0.34, y: O.y };
    const kPt = { x: O.x, y: O.y - 34 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Projections dashed box */}
          <line x1={A.x} y1={A.y} x2={H.x} y2={H.y} stroke="#64748b" strokeWidth="1.15" strokeDasharray="3.5 3" />
          <line x1={B.x} y1={B.y} x2={H.x} y2={H.y} stroke="#64748b" strokeWidth="1.15" strokeDasharray="3.5 3" />
          <line x1={P.x} y1={P.y} x2={H.x} y2={H.y} stroke="#64748b" strokeWidth="1.15" strokeDasharray="3.5 3" />
          <line x1={P.x} y1={P.y} x2={C.x} y2={C.y} stroke="#64748b" strokeWidth="1.15" strokeDasharray="3.5 3" />
          <line x1={O.x} y1={O.y} x2={H.x} y2={H.y} stroke="#0f172a" strokeWidth="1.25" />
          {/* Angle arcs for alpha and beta */}
          <path d={`M ${O.x - 14} ${O.y + 10} Q ${O.x + 2} ${O.y + 18} ${O.x + 17} ${O.y + 9}`} fill="none" stroke="#d97706" strokeWidth="1.2" />
          <path d={`M ${O.x + 21} ${O.y + 11} Q ${O.x + 25} ${O.y - 3} ${O.x + 16} ${O.y - 17}`} fill="none" stroke="#16a34a" strokeWidth="1.2" />
          {/* Coordinate axes */}
          <line x1={O.x} y1={O.y} x2={xEnd.x} y2={xEnd.y} stroke="#0f172a" strokeWidth="1.35" />
          <polygon points={`${xEnd.x - 3},${xEnd.y + 2} ${xEnd.x + 5},${xEnd.y + 1} ${xEnd.x},${xEnd.y - 5}`} fill="#0f172a" />
          <line x1={O.x} y1={O.y} x2={yEnd.x} y2={yEnd.y} stroke="#0f172a" strokeWidth="1.35" />
          <polygon points={`${yEnd.x + 4},${yEnd.y} ${yEnd.x - 3},${yEnd.y - 3.5} ${yEnd.x - 3},${yEnd.y + 3.5}`} fill="#0f172a" />
          <line x1={O.x} y1={O.y} x2={zEnd.x} y2={zEnd.y} stroke="#0f172a" strokeWidth="1.35" />
          <polygon points={`${zEnd.x},${zEnd.y - 4} ${zEnd.x - 3.5},${zEnd.y + 3} ${zEnd.x + 3.5},${zEnd.y + 3}`} fill="#0f172a" />
          {/* Unit vectors i, j, k */}
          <line x1={O.x} y1={O.y} x2={iPt.x} y2={iPt.y} stroke="#2563eb" strokeWidth="1.8" />
          <line x1={O.x} y1={O.y} x2={jPt.x} y2={jPt.y} stroke="#2563eb" strokeWidth="1.8" />
          <line x1={O.x} y1={O.y} x2={kPt.x} y2={kPt.y} stroke="#2563eb" strokeWidth="1.8" />
          {/* Vector OP */}
          <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#0284c7" strokeWidth="1.7" />
          {/* Airplane marker at P */}
          <g transform={`translate(${P.x}, ${P.y}) rotate(-28)`}>
            <path d="M -11 0 L 10 -2 L 13 0 L 10 2 Z" fill="#0284c7" stroke="#0f172a" strokeWidth="0.7" />
            <path d="M -2 0 L -7 -9 L -3 -9 L 3 0 L -3 9 L -7 9 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="0.6" />
          </g>
          {[O, A, B, C, H].map((pt, idx) => (
            <circle key={idx} cx={pt.x} cy={pt.y} r="2" fill="#0f172a" />
          ))}
          <text x={O.x - 10} y={O.y - 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={A.x - 10} y={A.y + 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x + 3} y={B.y - 6} fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x - 10} y={C.y + 4} textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={H.x + 6} y={H.y + 11} fontSize="10" fontStyle="italic" fill="#0f172a">H</text>
          <text x={P.x + 12} y={P.y - 8} fontSize="10" fontStyle="italic" fill="#0284c7">P</text>
          <text x={iPt.x - 12} y={iPt.y - 2} fontSize="9.5" fontStyle="italic" fill="#2563eb">i</text>
          <text x={jPt.x - 2} y={jPt.y - 6} fontSize="9.5" fontStyle="italic" fill="#2563eb">j</text>
          <text x={kPt.x - 10} y={kPt.y + 4} fontSize="9.5" fontStyle="italic" fill="#2563eb">k</text>
          <text x={O.x - 4} y={O.y + 24} fontSize="8.5" fill="#d97706">{alpha}°</text>
          <text x={O.x + 25} y={O.y - 9} fontSize="8.5" fill="#16a34a">{beta}°</text>
          <text x={xEnd.x + 10} y={xEnd.y - 2} fontSize="10.5" fontStyle="italic" fill="#0f172a">x</text>
          <text x={yEnd.x + 2} y={yEnd.y - 7} fontSize="10.5" fontStyle="italic" fill="#0f172a">y</text>
          <text x={zEnd.x + 8} y={zEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#0f172a">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'atc_radar_tower_3d') {
    const w = compact ? 245 : 275;
    const h = compact ? 185 : 206;
    const O = { x: 86, y: h - 38 };
    const xEnd = { x: 30, y: h - 6 };
    const yEnd = { x: w - 26, y: O.y };
    const zEnd = { x: O.x, y: 18 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Radar tower body & cabin */}
          <rect x={O.x - 8} y={O.y - 96} width="16" height="96" fill="#a5f3fc" stroke="#0e7490" strokeWidth="1.2" />
          <rect x={O.x - 16} y={O.y - 112} width="32" height="16" fill="#fef08a" stroke="#a16207" strokeWidth="1.2" />
          <polygon points={`${O.x - 20},${O.y - 112} ${O.x},${O.y - 125} ${O.x + 20},${O.y - 112}`} fill="#ef4444" stroke="#991b1b" strokeWidth="1.1" />
          {/* Radar pulse arcs */}
          <path d={`M ${O.x + 14} ${O.y - 130} Q ${O.x + 26} ${O.y - 122} ${O.x + 22} ${O.y - 106}`} fill="none" stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3 2" />
          <path d={`M ${O.x + 22} ${O.y - 135} Q ${O.x + 38} ${O.y - 124} ${O.x + 32} ${O.y - 102}`} fill="none" stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3 2" />
          {/* Coordinate axes */}
          <line x1={O.x} y1={O.y} x2={yEnd.x} y2={yEnd.y} stroke="#dc2626" strokeWidth="1.7" />
          <polygon points={`${yEnd.x + 4},${yEnd.y} ${yEnd.x - 4},${yEnd.y - 3.5} ${yEnd.x - 4},${yEnd.y + 3.5}`} fill="#dc2626" />
          <line x1={O.x} y1={O.y} x2={zEnd.x} y2={zEnd.y} stroke="#dc2626" strokeWidth="1.7" />
          <polygon points={`${zEnd.x},${zEnd.y - 4} ${zEnd.x - 3.5},${zEnd.y + 4} ${zEnd.x + 3.5},${zEnd.y + 4}`} fill="#dc2626" />
          <line x1={O.x} y1={O.y} x2={xEnd.x} y2={xEnd.y} stroke="#dc2626" strokeWidth="1.7" />
          <polygon points={`${xEnd.x - 3},${xEnd.y + 2} ${xEnd.x + 5},${xEnd.y + 1.5} ${xEnd.x + 1},${xEnd.y - 5}`} fill="#dc2626" />
          <circle cx={O.x} cy={O.y} r="3" fill="#dc2626" />
          <text x={O.x + 8} y={O.y + 13} fontSize="10.5" fontStyle="italic" fill="#dc2626">O</text>
          <text x={xEnd.x - 8} y={xEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#dc2626">x</text>
          <text x={yEnd.x} y={yEnd.y - 7} fontSize="10.5" fontStyle="italic" fill="#dc2626">y</text>
          <text x={zEnd.x + 8} y={zEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#dc2626">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'grid_points_cone_3d') {
    const x0 = params.x0 ?? 1;
    const y0 = params.y0 ?? 2;
    const z0 = params.z0 ?? 3;
    const a = params.a ?? 2;
    const b = params.b ?? 3;
    const xMaxG = Math.max(3, x0 + a);
    const yMaxG = Math.max(5, y0 + b);
    const zMaxG = Math.max(6, z0 + b);
    const w = compact ? 270 : 306;
    const h = compact ? 215 : 242;
    const O = { x: 84, y: h - 54 };
    const ux = -14;
    const uy = 16;
    const vScale = (w - O.x - 28) / yMaxG;
    const zScale = (O.y - 24) / zMaxG;
    const proj = (x: number, y: number, z: number) => ({
      x: O.x + x * ux + y * vScale,
      y: O.y + x * uy - z * zScale,
    });
    const S = proj(x0, y0, z0);
    const A = proj(x0 + a, y0, z0);
    const B = proj(x0, y0 + b, z0);
    const C = proj(x0, y0, z0 + b);
    const S0 = proj(x0, y0, 0);
    const A0 = proj(x0 + a, y0, 0);
    const B0 = proj(x0, y0 + b, 0);
    const zS = proj(0, 0, z0);
    const zC = proj(0, 0, z0 + b);
    const xEnd = proj(xMaxG + 0.8, 0, 0);
    const yEnd = proj(0, yMaxG + 0.7, 0);
    const zEnd = proj(0, 0, zMaxG + 0.7);
    const gridLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    for (let x = 1; x <= xMaxG; x++) {
      const p0 = proj(x, 0, 0);
      const py = proj(x, yMaxG, 0);
      const pz = proj(x, 0, zMaxG);
      gridLines.push({ x1: p0.x, y1: p0.y, x2: py.x, y2: py.y });
      gridLines.push({ x1: p0.x, y1: p0.y, x2: pz.x, y2: pz.y });
    }
    for (let y = 1; y <= yMaxG; y++) {
      const p0 = proj(0, y, 0);
      const px = proj(xMaxG, y, 0);
      const pz = proj(0, y, zMaxG);
      gridLines.push({ x1: p0.x, y1: p0.y, x2: px.x, y2: px.y });
      gridLines.push({ x1: p0.x, y1: p0.y, x2: pz.x, y2: pz.y });
    }
    for (let z = 1; z <= zMaxG; z++) {
      const p0 = proj(0, 0, z);
      const px = proj(xMaxG, 0, z);
      const py = proj(0, yMaxG, z);
      gridLines.push({ x1: p0.x, y1: p0.y, x2: px.x, y2: px.y });
      gridLines.push({ x1: p0.x, y1: p0.y, x2: py.x, y2: py.y });
    }
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {gridLines.map((ln, i) => (
            <line key={i} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} stroke="#cbd5e1" strokeWidth="0.7" />
          ))}
          {/* Axes */}
          <line x1={O.x} y1={O.y} x2={xEnd.x} y2={xEnd.y} stroke="#0f172a" strokeWidth="1.35" />
          <line x1={O.x} y1={O.y} x2={yEnd.x} y2={yEnd.y} stroke="#0f172a" strokeWidth="1.35" />
          <line x1={O.x} y1={O.y} x2={zEnd.x} y2={zEnd.y} stroke="#0f172a" strokeWidth="1.35" />
          {/* Dashed guides */}
          <line x1={S.x} y1={S.y} x2={S0.x} y2={S0.y} stroke="#475569" strokeWidth="1" strokeDasharray="3 2.5" />
          <line x1={A.x} y1={A.y} x2={A0.x} y2={A0.y} stroke="#475569" strokeWidth="1" strokeDasharray="3 2.5" />
          <line x1={B.x} y1={B.y} x2={B0.x} y2={B0.y} stroke="#475569" strokeWidth="1" strokeDasharray="3 2.5" />
          <line x1={S.x} y1={S.y} x2={zS.x} y2={zS.y} stroke="#475569" strokeWidth="1" strokeDasharray="3 2.5" />
          <line x1={C.x} y1={C.y} x2={zC.x} y2={zC.y} stroke="#475569" strokeWidth="1" strokeDasharray="3 2.5" />
          {/* Trihedral edges at S */}
          <line x1={S.x} y1={S.y} x2={A.x} y2={A.y} stroke="#0284c7" strokeWidth="1.5" />
          <line x1={S.x} y1={S.y} x2={B.x} y2={B.y} stroke="#0284c7" strokeWidth="1.5" />
          <line x1={S.x} y1={S.y} x2={C.x} y2={C.y} stroke="#0284c7" strokeWidth="1.5" />
          {[S, A, B, C].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2.4" fill="#0f172a" />
          ))}
          <text x={O.x - 12} y={O.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={zS.x - 10} y={zS.y + 3} fontSize="9.5" fill="#334155">{z0}</text>
          <text x={zC.x - 10} y={zC.y + 3} fontSize="9.5" fill="#334155">{z0 + b}</text>
          <text x={xEnd.x + 8} y={xEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
          <text x={yEnd.x + 2} y={yEnd.y - 6} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
          <text x={zEnd.x + 7} y={zEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">z</text>
          <text x={A.x - 11} y={A.y - 3} fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x + 6} y={B.y - 4} fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={S.x + 6} y={S.y - 5} fontSize="9.5" fontStyle="italic" fill="#0f172a">
            S({x0};{y0};{z0})
          </text>
          <text x={C.x + 6} y={C.y - 4} fontSize="9.5" fontStyle="italic" fill="#0f172a">
            C({x0};{y0};{z0 + b})
          </text>
        </svg>
      </div>
    );
  }

  if (figureType === 'cuboid_OABC_3d') {
    const w = compact ? 245 : 275;
    const h = compact ? 195 : 218;
    const O = { x: 86, y: h - 54 };
    const A = { x: 46, y: h - 26 };
    const B = { x: 148, y: h - 22 };
    const C = { x: 188, y: h - 50 };
    const boxH = 88;
    const O1 = { x: O.x, y: O.y - boxH };
    const A1 = { x: A.x, y: A.y - boxH };
    const B1 = { x: B.x, y: B.y - boxH };
    const C1 = { x: C.x, y: C.y - boxH };
    const xEnd = { x: 18, y: h - 6 };
    const yEnd = { x: w - 22, y: C.y + 4 };
    const zEnd = { x: O1.x, y: 18 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={A.x} y1={A.y} x2={O.x} y2={O.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={O.x} y1={O.y} x2={O1.x} y2={O1.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <polygon points={`${O1.x},${O1.y} ${A1.x},${A1.y} ${B1.x},${B1.y} ${C1.x},${C1.y}`} fill="#e0f2fe" fillOpacity="0.22" stroke="#0f172a" strokeWidth="1.4" />
          <polyline points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke="#0f172a" strokeWidth="1.4" />
          <line x1={A.x} y1={A.y} x2={A1.x} y2={A1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={B.x} y1={B.y} x2={B1.x} y2={B1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={C.x} y1={C.y} x2={C1.x} y2={C1.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={A.x} y1={A.y} x2={xEnd.x} y2={xEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <line x1={C.x} y1={C.y} x2={yEnd.x} y2={yEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          <line x1={O1.x} y1={O1.y} x2={zEnd.x} y2={zEnd.y} stroke="#0284c7" strokeWidth="1.45" />
          {[O, A, B, C, O1, A1, B1, C1].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2" fill="#0f172a" />
          ))}
          <text x={O.x - 10} y={O.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={A.x - 10} y={A.y + 3} fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x} y={B.y + 13} fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 8} y={C.y - 3} fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={O1.x - 14} y={O1.y - 2} fontSize="10" fontStyle="italic" fill="#0f172a">O'</text>
          <text x={A1.x - 14} y={A1.y - 2} fontSize="10" fontStyle="italic" fill="#0f172a">A'</text>
          <text x={B1.x + 7} y={B1.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">B'</text>
          <text x={C1.x + 6} y={C1.y - 6} fontSize="10" fontStyle="italic" fill="#0f172a">C'</text>
          <text x={xEnd.x - 7} y={xEnd.y + 3} fontSize="10.5" fontStyle="italic" fill="#0284c7">x</text>
          <text x={yEnd.x + 6} y={yEnd.y + 3} fontSize="10.5" fontStyle="italic" fill="#0284c7">y</text>
          <text x={zEnd.x + 7} y={zEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#0284c7">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'two_drones_3d') {
    const xA = params.xA ?? 7;
    const yA = params.yA ?? -8;
    const xB = params.xB ?? 2;
    const yB = params.yB ?? 7;
    const w = compact ? 265 : 298;
    const h = compact ? 185 : 208;
    const O = { x: 102, y: 112 };
    const A = { x: 158, y: 82 };
    const A0 = { x: 158, y: 152 };
    const Ax = { x: 198, y: 112 };
    const Ay = { x: 62, y: 152 };
    const B = { x: 184, y: 30 };
    const B0 = { x: 184, y: 84 };
    const Bx = { x: 156, y: 112 };
    const By = { x: 130, y: 84 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Axes: x horizontal right, y diagonal SW-NE, z vertical */}
          <line x1={38} y1={O.y} x2={w - 22} y2={O.y} stroke="#0f172a" strokeWidth="1.3" />
          <line x1={42} y1={172} x2={182} y2={32} stroke="#0f172a" strokeWidth="1.3" />
          <line x1={O.x} y1={O.y} x2={O.x} y2={16} stroke="#0f172a" strokeWidth="1.3" />
          {/* Drone A guides */}
          <polyline points={`${Ax.x},${Ax.y} ${A0.x},${A0.y} ${Ay.x},${Ay.y}`} fill="none" stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 2.5" />
          <line x1={A.x} y1={A.y} x2={A0.x} y2={A0.y} stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 2.5" />
          {/* Drone B guides */}
          <polyline points={`${Bx.x},${Bx.y} ${B0.x},${B0.y} ${By.x},${By.y}`} fill="none" stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 2.5" />
          <line x1={B.x} y1={B.y} x2={B0.x} y2={B0.y} stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 2.5" />
          <circle cx={A.x} cy={A.y} r="3" fill="#0284c7" />
          <circle cx={B.x} cy={B.y} r="3" fill="#dc2626" />
          <text x={O.x + 6} y={O.y + 13} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={A.x + 6} y={A.y - 3} fontSize="10.5" fontStyle="italic" fill="#0284c7">A</text>
          <text x={B.x + 6} y={B.y - 3} fontSize="10.5" fontStyle="italic" fill="#dc2626">B</text>
          <text x={Ax.x} y={Ax.y + 12} fontSize="9" fill="#334155">{xA}</text>
          <text x={Ay.x - 16} y={Ay.y + 4} fontSize="9" fill="#334155">{yA}</text>
          <text x={Bx.x - 4} y={Bx.y + 12} fontSize="9" fill="#334155">{xB}</text>
          <text x={By.x - 12} y={By.y - 2} fontSize="9" fill="#334155">{yB}</text>
          <text x={w - 16} y={O.y + 12} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
          <text x={186} y={32} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
          <text x={O.x + 7} y={22} fontSize="10" fontStyle="italic" fill="#0f172a">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'kingfisher_fish_3d') {
    const variant = params.variant ?? 0; // 0: 2 birds A, B aiming at fish C on (Oxy); 1: 1 bird C aiming at underwater fish A crossing water at B
    const w = compact ? 265 : 298;
    const h = compact ? 185 : 208;
    const O = { x: 86, y: h - 56 };
    const xEnd = { x: w - 34, y: O.y };
    const yEnd = { x: 26, y: h - 14 };
    const zEnd = { x: O.x, y: 18 };
    const waterPoly = `${O.x},${O.y} ${w - 46},${O.y} ${w - 102},${h - 16} 30,${h - 16}`;
    if (variant === 1) {
      const C = { x: 196, y: 42 };
      const A = { x: 108, y: h - 22 };
      const B = { x: 122, y: h - 33 };
      return (
        <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
            <polygon points={waterPoly} fill="#bae6fd" fillOpacity="0.65" />
            <line x1={O.x} y1={O.y} x2={xEnd.x} y2={xEnd.y} stroke="#0f172a" strokeWidth="1.25" />
            <line x1={O.x} y1={O.y} x2={yEnd.x} y2={yEnd.y} stroke="#0f172a" strokeWidth="1.25" />
            <line x1={O.x} y1={O.y} x2={zEnd.x} y2={zEnd.y} stroke="#0f172a" strokeWidth="1.25" />
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#0284c7" strokeWidth="1.4" strokeDasharray="3.5 2.5" />
            <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#0284c7" strokeWidth="1.6" />
            {/* Stylized fish at A */}
            <ellipse cx={A.x} cy={A.y} rx="9" ry="4.5" fill="#f59e0b" stroke="#92400e" strokeWidth="0.8" />
            <polygon points={`${A.x + 9},${A.y} ${A.x + 15},${A.y - 4} ${A.x + 15},${A.y + 4}`} fill="#f59e0b" />
            {/* Stylized kingfisher at C */}
            <ellipse cx={C.x} cy={C.y} rx="9" ry="5" transform={`rotate(-30 ${C.x} ${C.y})`} fill="#2563eb" />
            <polygon points={`${C.x - 8},${C.y + 4} ${C.x - 16},${C.y + 8} ${C.x - 5},${C.y + 8}`} fill="#ea580c" />
            {[O, A, B, C].map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="2.2" fill="#0f172a" />
            ))}
            <text x={O.x - 8} y={O.y + 12} fontSize="9.5" fontStyle="italic" fill="#0f172a">O</text>
            <text x={A.x - 12} y={A.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
            <text x={B.x + 7} y={B.y + 3} fontSize="10" fontStyle="italic" fill="#0284c7">B</text>
            <text x={C.x + 8} y={C.y - 6} fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
            <text x={xEnd.x + 5} y={xEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
            <text x={yEnd.x - 10} y={yEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
            <text x={zEnd.x + 7} y={zEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">z</text>
          </svg>
        </div>
      );
    }
    const A = { x: 64, y: 42 };
    const B = { x: 204, y: 38 };
    const C = { x: 112, y: h - 30 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={waterPoly} fill="#bae6fd" fillOpacity="0.65" />
          <line x1={O.x} y1={O.y} x2={xEnd.x} y2={xEnd.y} stroke="#0f172a" strokeWidth="1.25" />
          <line x1={O.x} y1={O.y} x2={yEnd.x} y2={yEnd.y} stroke="#0f172a" strokeWidth="1.25" />
          <line x1={O.x} y1={O.y} x2={zEnd.x} y2={zEnd.y} stroke="#0f172a" strokeWidth="1.25" />
          <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#0284c7" strokeWidth="1.5" />
          <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#ea580c" strokeWidth="1.4" strokeDasharray="3.5 2.5" />
          <ellipse cx={C.x} cy={C.y} rx="9" ry="4.5" fill="#f59e0b" stroke="#92400e" strokeWidth="0.8" />
          <polygon points={`${C.x + 9},${C.y} ${C.x + 15},${C.y - 4} ${C.x + 15},${C.y + 4}`} fill="#f59e0b" />
          <ellipse cx={A.x} cy={A.y} rx="8" ry="4.5" transform={`rotate(35 ${A.x} ${A.y})`} fill="#2563eb" />
          <ellipse cx={B.x} cy={B.y} rx="8" ry="4.5" transform={`rotate(-35 ${B.x} ${B.y})`} fill="#2563eb" />
          {[O, A, B, C].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2.2" fill="#0f172a" />
          ))}
          <text x={O.x - 10} y={O.y + 11} fontSize="9.5" fontStyle="italic" fill="#0f172a">O</text>
          <text x={A.x - 12} y={A.y - 4} fontSize="10" fontStyle="italic" fill="#0284c7">A</text>
          <text x={B.x + 8} y={B.y - 4} fontSize="10" fontStyle="italic" fill="#ea580c">B</text>
          <text x={C.x - 14} y={C.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={xEnd.x + 5} y={xEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
          <text x={yEnd.x - 10} y={yEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
          <text x={zEnd.x + 7} y={zEnd.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'plane_flight_path_3d') {
    const w = compact ? 255 : 290;
    const h = compact ? 115 : 130;
    const F = { x: 54, y: h - 28 };
    const E = { x: 186, y: 46 };
    const M = { x: 242, y: 26 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={F.x} y1={F.y} x2={E.x} y2={E.y} stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1={E.x} y1={E.y} x2={M.x} y2={M.y} stroke="#0284c7" strokeWidth="1.8" />
          <polygon points={`${M.x + 4},${M.y - 1} ${M.x - 5},${M.y - 3} ${M.x - 2},${M.y + 5}`} fill="#0284c7" />
          <g transform={`translate(${F.x - 14}, ${F.y + 5}) rotate(-20)`}>
            <path d="M -10 0 L 10 -2 L 13 0 L 10 2 Z" fill="#06b6d4" stroke="#0f172a" strokeWidth="0.7" />
            <path d="M -2 0 L -7 -8 L -3 -8 L 3 0 L -3 8 L -7 8 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="0.6" />
          </g>
          <circle cx={F.x} cy={F.y} r="2.3" fill="#0f172a" />
          <circle cx={E.x} cy={E.y} r="2.3" fill="#0f172a" />
          <circle cx={M.x} cy={M.y} r="2.3" fill="#0284c7" />
          <text x={F.x - 2} y={F.y - 9} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">F</text>
          <text x={E.x - 2} y={E.y - 9} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0f172a">E</text>
          <text x={M.x + 2} y={M.y - 8} textAnchor="middle" fontSize="11" fontStyle="italic" fill="#0284c7">M</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_signed_area_plot') {
    const a = params.a ?? -1;
    const b = params.b ?? 4;
    const w = compact ? 270 : 310;
    const h = compact ? 175 : 196;
    const xMin = a - 0.8;
    const xMax = b + 0.8;
    const spanL = Math.abs(a);
    const spanR = b;
    // Scale curve visually so left dip and right arch both fit nicely
    const evalF = (x: number) => {
      if (x <= 0) return (x * (x - a)) / Math.max(0.25, (spanL * spanL) / 4);
      return (-x * (x - b)) / Math.max(0.25, (spanR * spanR) / 4) * 2.4;
    };
    const yMin = -1.6;
    const yMax = 3.1;
    const pad = 22;
    const mapX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - pad * 2);
    const mapY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * (h - pad * 2);
    const oxY = mapY(0);
    const oyX = mapX(0);

    const buildSeg = (x0: number, x1: number, steps = 40) => {
      const pts: Array<[number, number]> = [];
      for (let i = 0; i <= steps; i++) {
        const x = x0 + ((x1 - x0) * i) / steps;
        pts.push([mapX(x), mapY(evalF(x))]);
      }
      return pts;
    };
    const leftPts = buildSeg(a, 0, 32);
    const rightPts = buildSeg(0, b, 48);
    const curvePts = [...leftPts, ...rightPts.slice(1)];
    const curveD = curvePts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
    const shadeLeft = `M ${mapX(a).toFixed(1)} ${oxY.toFixed(1)} ` + leftPts.map(([px, py]) => `L ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ') + ` L ${oyX.toFixed(1)} ${oxY.toFixed(1)} Z`;
    const shadeRight = `M ${oyX.toFixed(1)} ${oxY.toFixed(1)} ` + rightPts.map(([px, py]) => `L ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ') + ` L ${mapX(b).toFixed(1)} ${oxY.toFixed(1)} Z`;
    const patId = `l13-hatch-${Math.abs(a * 7 + b * 13)}`;

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#64748b" strokeWidth="1.2" />
            </pattern>
          </defs>
          <path d={shadeLeft} fill={`url(#${patId})`} opacity="0.6" />
          <path d={shadeRight} fill={`url(#${patId})`} opacity="0.6" />
          <line x1={pad - 6} y1={oxY} x2={w - pad + 8} y2={oxY} stroke="#1e293b" strokeWidth="1.2" />
          <line x1={oyX} y1={h - pad + 4} x2={oyX} y2={pad - 8} stroke="#1e293b" strokeWidth="1.2" />
          <path d={curveD} fill="none" stroke="#1d4ed8" strokeWidth="2.1" strokeLinecap="round" />
          <circle cx={oyX} cy={oxY} r="2.2" fill="#0f172a" />
          <circle cx={mapX(a)} cy={oxY} r="2.2" fill="#0f172a" />
          <circle cx={mapX(b)} cy={oxY} r="2.2" fill="#0f172a" />
          <text x={w - pad + 4} y={oxY + 13} fontSize="10.5" fontStyle="italic" fill="#0f172a">x</text>
          <text x={oyX - 11} y={pad - 1} fontSize="10.5" fontStyle="italic" fill="#0f172a">y</text>
          <text x={oyX + 6} y={oxY + 12} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={mapX(a) - 3} y={oxY - 7} textAnchor="middle" fontSize="10" fill="#0f172a">{a}</text>
          <text x={mapX(b) + 2} y={oxY + 13} textAnchor="middle" fontSize="10" fill="#0f172a">{b}</text>
          <text x={mapX(b * 0.65)} y={pad + 12} fontSize="10" fontStyle="italic" fill="#1d4ed8">y = f(x)</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_two_parabolas_area') {
    const p = params.p ?? -2;
    const q = params.q ?? 4;
    const c = params.c ?? -1;
    const b = params.b ?? 3;
    const fmtQuad = (a2: number, b1: number, c0: number) => {
      const parts: string[] = [];
      parts.push(a2 === 1 ? 'x²' : a2 === -1 ? '-x²' : `${a2}x²`);
      if (b1 !== 0) parts.push((b1 > 0 ? ' + ' : ' - ') + (Math.abs(b1) === 1 ? 'x' : `${Math.abs(b1)}x`));
      if (c0 !== 0) parts.push((c0 > 0 ? ' + ' : ' - ') + Math.abs(c0));
      return `y = ${parts.join('')}`;
    };
    const f1 = (x: number) => x * x + p * x + c;
    const f2 = (x: number) => -x * x + q * x + c;
    const xMin = -0.9;
    const xMax = b + 1.1;
    let yMin = Math.min(c - 1.5, f1(-p / 2) - 0.8);
    let yMax = Math.max(f2(q / 2) + 1.0, 2.5);
    yMin = Math.max(-8, Math.min(-1.5, yMin));
    yMax = Math.min(14, Math.max(3, yMax));
    const w = compact ? 270 : 310;
    const h = compact ? 190 : 215;
    const pad = 22;
    const mapX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - pad * 2);
    const mapY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * (h - pad * 2);
    const steps = 60;
    const p1All: string[] = [];
    const p2All: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + ((xMax - xMin) * i) / steps;
      const y1 = f1(x);
      const y2 = f2(x);
      if (y1 >= yMin - 0.5 && y1 <= yMax + 0.5) p1All.push(`${p1All.length === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(y1).toFixed(1)}`);
      if (y2 >= yMin - 0.5 && y2 <= yMax + 0.5) p2All.push(`${p2All.length === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(y2).toFixed(1)}`);
    }
    const shadePts1: string[] = [];
    const shadePts2: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = (b * i) / 40;
      shadePts1.push(`${i === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(f1(x)).toFixed(1)}`);
    }
    for (let i = 40; i >= 0; i--) {
      const x = (b * i) / 40;
      shadePts2.push(`L ${mapX(x).toFixed(1)} ${mapY(f2(x)).toFixed(1)}`);
    }
    const shadeD = shadePts1.join(' ') + ' ' + shadePts2.join(' ') + ' Z';
    const yb = f1(b);
    const oxY = mapY(0);
    const oyX = mapX(0);
    const patId = `l13-tp-${Math.abs(p * 11 + q * 17 + b * 7)}`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#64748b" strokeWidth="1.2" />
            </pattern>
          </defs>
          <path d={shadeD} fill={`url(#${patId})`} opacity="0.65" />
          <line x1={pad - 6} y1={oxY} x2={w - pad + 8} y2={oxY} stroke="#1e293b" strokeWidth="1.15" />
          <line x1={oyX} y1={h - pad + 4} x2={oyX} y2={pad - 6} stroke="#1e293b" strokeWidth="1.15" />
          <path d={p1All.join(' ')} fill="none" stroke="#0f172a" strokeWidth="1.6" />
          <path d={p2All.join(' ')} fill="none" stroke="#0284c7" strokeWidth="1.6" />
          <line x1={mapX(b)} y1={oxY} x2={mapX(b)} y2={mapY(yb)} stroke="#475569" strokeWidth="1" strokeDasharray="3 2.5" />
          <circle cx={oyX} cy={mapY(c)} r="2.2" fill="#0f172a" />
          <circle cx={mapX(b)} cy={mapY(yb)} r="2.2" fill="#0f172a" />
          <text x={oyX - 8} y={oxY + 12} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={mapX(b)} y={oxY + 12} textAnchor="middle" fontSize="10" fill="#0f172a">{b}</text>
          <text x={w - pad + 3} y={oxY + 12} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
          <text x={oyX - 10} y={pad} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
          <text x={pad + 4} y={h - pad + 14} fontSize="9" fill="#0f172a">{fmtQuad(1, p, c)}</text>
          <text x={w - pad - 4} y={pad + 10} textAnchor="end" fontSize="9" fill="#0284c7">{fmtQuad(-1, q, c)}</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_parabola_line_area') {
    const p = params.p ?? 4;
    const k = params.k ?? 1;
    const b = params.b ?? 5;
    const fmtQuad = `${'y = x²'}${p > 0 ? ` - ${p === 1 ? 'x' : `${p}x`}` : p < 0 ? ` + ${Math.abs(p)}x` : ''}`;
    const fmtLine = `y = ${k === 1 ? 'x' : `${k}x`}`;
    const f1 = (x: number) => x * x - p * x;
    const f2 = (x: number) => k * x;
    const xMin = -0.8;
    const xMax = b + 1.0;
    const yMin = Math.max(-9, f1(p / 2) - 1.2);
    const yMax = Math.min(18, Math.max(f2(b) + 1.5, 4));
    const w = compact ? 270 : 310;
    const h = compact ? 190 : 215;
    const pad = 22;
    const mapX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - pad * 2);
    const mapY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * (h - pad * 2);
    const steps = 60;
    const p1All: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + ((xMax - xMin) * i) / steps;
      const y1 = f1(x);
      if (y1 >= yMin - 0.5 && y1 <= yMax + 0.5) p1All.push(`${p1All.length === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(y1).toFixed(1)}`);
    }
    const shadePts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = (b * i) / 40;
      shadePts.push(`${i === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(f1(x)).toFixed(1)}`);
    }
    shadePts.push(`L ${mapX(b).toFixed(1)} ${mapY(f2(b)).toFixed(1)} L ${mapX(0).toFixed(1)} ${mapY(0).toFixed(1)} Z`);
    const oxY = mapY(0);
    const oyX = mapX(0);
    const patId = `l13-pl-${Math.abs(p * 13 + k * 7 + b * 11)}`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#64748b" strokeWidth="1.2" />
            </pattern>
          </defs>
          <path d={shadePts.join(' ')} fill={`url(#${patId})`} opacity="0.65" />
          <line x1={pad - 6} y1={oxY} x2={w - pad + 8} y2={oxY} stroke="#1e293b" strokeWidth="1.15" />
          <line x1={oyX} y1={h - pad + 4} x2={oyX} y2={pad - 6} stroke="#1e293b" strokeWidth="1.15" />
          <path d={p1All.join(' ')} fill="none" stroke="#0f172a" strokeWidth="1.6" />
          <line x1={mapX(xMin)} y1={mapY(f2(xMin))} x2={mapX(xMax)} y2={mapY(f2(xMax))} stroke="#0284c7" strokeWidth="1.5" />
          <line x1={mapX(b)} y1={oxY} x2={mapX(b)} y2={mapY(f2(b))} stroke="#475569" strokeWidth="1" strokeDasharray="3 2.5" />
          <circle cx={oyX} cy={oxY} r="2.2" fill="#0f172a" />
          <circle cx={mapX(b)} cy={mapY(f2(b))} r="2.2" fill="#0f172a" />
          <text x={oyX - 9} y={oxY + 12} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={mapX(b)} y={oxY + 12} textAnchor="middle" fontSize="10" fill="#0f172a">{b}</text>
          <text x={w - pad + 3} y={oxY + 12} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
          <text x={oyX - 10} y={pad} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
          <text x={pad + 4} y={h - pad + 14} fontSize="9.5" fill="#0f172a">{fmtQuad}</text>
          <text x={w - pad - 4} y={pad + 10} textAnchor="end" fontSize="9.5" fill="#0284c7">{fmtLine}</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_curved_triangle') {
    const xv = params.xv ?? 1;
    const xm = params.xm ?? 4;
    const xr = params.xr ?? 5;
    const ym = params.ym ?? 9;
    const xMin = Math.min(0, xv) - 0.8;
    const xMax = xr + 1.0;
    const yMin = -0.8;
    const yMax = ym * 1.18 + 0.5;
    const w = compact ? 260 : 300;
    const h = compact ? 180 : 204;
    const pad = 22;
    const mapX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - pad * 2);
    const mapY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * (h - pad * 2);
    const oxY = mapY(0);
    const oyX = mapX(0);
    const fPara = (x: number) => (x - xv) * (x - xv);
    const fLine = (x: number) => (ym * (xr - x)) / Math.max(0.1, xr - xm);

    const paraPts: string[] = [];
    for (let i = 0; i <= 50; i++) {
      const x = xv - 0.6 + ((xm - xv + 1.1) * i) / 50;
      const y = fPara(x);
      if (y <= yMax) paraPts.push(`${paraPts.length === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(y).toFixed(1)}`);
    }
    const shadePts: string[] = [`M ${mapX(xv).toFixed(1)} ${oxY.toFixed(1)}`];
    for (let i = 1; i <= 30; i++) {
      const x = xv + ((xm - xv) * i) / 30;
      shadePts.push(`L ${mapX(x).toFixed(1)} ${mapY(fPara(x)).toFixed(1)}`);
    }
    shadePts.push(`L ${mapX(xr).toFixed(1)} ${oxY.toFixed(1)} Z`);
    const patId = `l13-ct-${Math.abs(xv * 7 + xm * 11 + xr * 13)}`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#64748b" strokeWidth="1.2" />
            </pattern>
          </defs>
          <path d={shadePts.join(' ')} fill={`url(#${patId})`} opacity="0.65" />
          <line x1={pad - 6} y1={oxY} x2={w - pad + 8} y2={oxY} stroke="#1e293b" strokeWidth="1.15" />
          <line x1={oyX} y1={h - pad + 4} x2={oyX} y2={pad - 6} stroke="#1e293b" strokeWidth="1.15" />
          <path d={paraPts.join(' ')} fill="none" stroke="#0f172a" strokeWidth="1.6" />
          <line x1={mapX(Math.max(xMin, xm - 0.5))} y1={mapY(fLine(Math.max(xMin, xm - 0.5)))} x2={mapX(xr + 0.3)} y2={mapY(fLine(xr + 0.3))} stroke="#0284c7" strokeWidth="1.6" />
          <line x1={mapX(xm)} y1={oxY} x2={mapX(xm)} y2={mapY(ym)} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2.5" />
          <circle cx={oyX} cy={oxY} r="2" fill="#0f172a" />
          <circle cx={mapX(xv)} cy={oxY} r="2" fill="#0f172a" />
          <circle cx={mapX(xr)} cy={oxY} r="2" fill="#0f172a" />
          <text x={oyX - 8} y={oxY + 12} fontSize="9.5" fontStyle="italic" fill="#0f172a">O</text>
          {xv !== 0 && <text x={mapX(xv)} y={oxY + 12} textAnchor="middle" fontSize="9.5" fill="#0f172a">{xv}</text>}
          {xm !== 0 && <text x={mapX(xm)} y={oxY + 12} textAnchor="middle" fontSize="9.5" fill="#0f172a">{xm}</text>}
          <text x={mapX(xr)} y={oxY + 12} textAnchor="middle" fontSize="9.5" fill="#0f172a">{xr}</text>
          <text x={w - pad + 3} y={oxY + 11} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
          <text x={oyX - 10} y={pad} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_two_curves_H') {
    const b = params.b ?? 2;
    const w = compact ? 270 : 306;
    const h = compact ? 185 : 210;
    const xMin = -0.6;
    const xMax = 3.8;
    const yMin = -0.8;
    const yMax = 6.5;
    const pad = 22;
    const mapX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - pad * 2);
    const mapY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * (h - pad * 2);
    const fTop = (x: number) => -0.65 * (x - 1.8) * (x - 1.8) + 5.6;
    const gBot = (x: number) => 0.8 * x + 1.4;
    const fPts: string[] = [];
    const shade: string[] = [];
    for (let i = 0; i <= 50; i++) {
      const x = -0.3 + (3.8 * i) / 50;
      fPts.push(`${i === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(fTop(x)).toFixed(1)}`);
    }
    for (let i = 0; i <= 35; i++) {
      const x = (2.9 * i) / 35;
      shade.push(`${i === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(fTop(x)).toFixed(1)}`);
    }
    for (let i = 35; i >= 0; i--) {
      const x = (2.9 * i) / 35;
      shade.push(`L ${mapX(x).toFixed(1)} ${mapY(gBot(x)).toFixed(1)}`);
    }
    shade.push('Z');
    const oxY = mapY(0);
    const oyX = mapX(0);
    const rxX = mapX(2.9);
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <path d={shade.join(' ')} fill="#cbd5e1" fillOpacity="0.65" />
          <line x1={pad - 6} y1={oxY} x2={w - pad + 8} y2={oxY} stroke="#1e293b" strokeWidth="1.2" />
          <line x1={oyX} y1={h - pad + 4} x2={oyX} y2={pad - 6} stroke="#1e293b" strokeWidth="1.2" />
          <path d={fPts.join(' ')} fill="none" stroke="#0f172a" strokeWidth="1.7" />
          <line x1={mapX(-0.3)} y1={mapY(gBot(-0.3))} x2={mapX(3.5)} y2={mapY(gBot(3.5))} stroke="#0284c7" strokeWidth="1.7" />
          <line x1={rxX} y1={oxY} x2={rxX} y2={mapY(fTop(2.9))} stroke="#475569" strokeWidth="1.1" strokeDasharray="3 2.5" />
          <text x={oyX - 9} y={oxY + 12} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={rxX} y={oxY + 13} textAnchor="middle" fontSize="10" fill="#0f172a">{b}</text>
          <text x={mapX(1.6)} y={mapY(3.7)} textAnchor="middle" fontSize="11" fontWeight="600" fill="#0f172a">(H)</text>
          <text x={mapX(1.65)} y={pad + 8} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#0f172a">y = f(x)</text>
          <text x={mapX(3.2)} y={mapY(gBot(3.2)) + 14} fontSize="10" fontStyle="italic" fill="#0284c7">y = g(x)</text>
          <text x={w - pad + 3} y={oxY + 12} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
          <text x={oyX - 10} y={pad} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_frustum_tank') {
    const a = params.a ?? 3;
    const b = params.b ?? 5;
    const H = params.H ?? 4;
    const Q = params.Q ?? 1;
    const w = compact ? 290 : 330;
    const h = compact ? 185 : 210;
    // Trapezoid cross section: top left (75, 44), top right (225, 44), bot right (185, 148), bot left (115, 148)
    // Water halfway up: y = 96 -> xL = 95, xR = 205
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points="115,148 185,148 205,96 95,96" fill="#bfdbfe" fillOpacity="0.85" />
          <line x1="95" y1="96" x2="205" y2="96" stroke="#2563eb" strokeWidth="1.5" />
          <polyline points="75,44 115,148 185,148 225,44" fill="none" stroke="#0f172a" strokeWidth="1.8" />
          <line x1="75" y1="44" x2="225" y2="44" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* Inflow arrow */}
          <line x1="162" y1="16" x2="162" y2="78" stroke="#0284c7" strokeWidth="2" />
          <polygon points="162,84 158,74 166,74" fill="#0284c7" />
          <text x="170" y="25" fontSize="10" fill="#0284c7">Q = {Q} m³/phút</text>
          {/* Dimensions */}
          <line x1="75" y1="33" x2="225" y2="33" stroke="#475569" strokeWidth="1" />
          <text x="150" y="29" textAnchor="middle" fontSize="10" fill="#0f172a">b = {b} m</text>
          <line x1="115" y1="160" x2="185" y2="160" stroke="#475569" strokeWidth="1" />
          <text x="150" y="173" textAnchor="middle" fontSize="10" fill="#0f172a">a = {a} m</text>
          <line x1="242" y1="44" x2="242" y2="148" stroke="#475569" strokeWidth="1" />
          <text x="249" y="100" fontSize="10" fill="#0f172a">H = {H} m</text>
          <line x1="60" y1="96" x2="60" y2="148" stroke="#475569" strokeWidth="1" />
          <text x="54" y="125" textAnchor="end" fontSize="10" fontStyle="italic" fill="#0f172a">h(t)</text>
          <text x="150" y="90" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#1d4ed8">x(h)</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_circle_two_parabolas') {
    const R = params.R ?? 8;
    const d = params.d ?? 2;
    const axesVariant = params.axesVariant ?? 1;
    const w = compact ? 250 : 280;
    const h = compact ? 210 : 235;
    const cx = w / 2;
    const cy = h / 2;
    const rPx = compact ? 74 : 84;
    const hVal = Math.max(0.5, R - d);
    const vOff = (hVal / R) * rPx;
    // Upper parabola: ends (-rPx, 0) and (rPx, 0), vertex (0, -vOff) -> Bezier control (0, -2*vOff)
    const upperD = `M ${cx - rPx} ${cy} Q ${cx} ${cy - 2 * vOff} ${cx + rPx} ${cy}`;
    const lowerD = `M ${cx - rPx} ${cy} Q ${cx} ${cy + 2 * vOff} ${cx + rPx} ${cy}`;
    const lensD = `M ${cx - rPx} ${cy} Q ${cx} ${cy - 2 * vOff} ${cx + rPx} ${cy} Q ${cx} ${cy + 2 * vOff} ${cx - rPx} ${cy} Z`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <circle cx={cx} cy={cy} r={rPx} fill="#f8fafc" stroke="#0f172a" strokeWidth="1.6" />
          <path d={lensD} fill="#bbf7d0" fillOpacity="0.55" />
          <path d={upperD} fill="none" stroke="#15803d" strokeWidth="1.7" />
          <path d={lowerD} fill="none" stroke="#15803d" strokeWidth="1.7" />
          <line x1={cx - rPx} y1={cy} x2={cx + rPx} y2={cy} stroke="#0f172a" strokeWidth="1.3" />
          {axesVariant === 1 && (
            <>
              <line x1={cx - rPx - 18} y1={cy} x2={cx + rPx + 20} y2={cy} stroke="#334155" strokeWidth="1.1" />
              <line x1={cx} y1={cy + rPx + 18} x2={cx} y2={cy - rPx - 18} stroke="#334155" strokeWidth="1.1" />
              <text x={cx + rPx + 22} y={cy + 4} fontSize="10" fontStyle="italic" fill="#0f172a">x</text>
              <text x={cx + 6} y={cy - rPx - 12} fontSize="10" fontStyle="italic" fill="#0f172a">y</text>
              <text x={cx - 10} y={cy + 12} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
              <circle cx={cx} cy={cy + vOff} r="2.2" fill="#0f172a" />
              <text x={cx - 10} y={cy + vOff - 4} fontSize="10" fontStyle="italic" fill="#0f172a">I</text>
            </>
          )}
          <line x1={cx + 4} y1={cy + vOff} x2={cx + 4} y2={cy + rPx} stroke="#dc2626" strokeWidth="1" strokeDasharray="2.5 2" />
          <text x={cx + 9} y={cy + (vOff + rPx) / 2 + 3} fontSize="9.5" fill="#dc2626">{d} m</text>
          <circle cx={cx - rPx} cy={cy} r="2.3" fill="#0f172a" />
          <circle cx={cx + rPx} cy={cy} r="2.3" fill="#0f172a" />
          <text x={cx - rPx - 10} y={cy + 12} fontSize="10.5" fontStyle="italic" fill="#0f172a">{axesVariant === 1 ? 'B' : 'A'}</text>
          <text x={cx + rPx + 5} y={cy + 12} fontSize="10.5" fontStyle="italic" fill="#0f172a">{axesVariant === 1 ? 'A' : 'B'}</text>
          {axesVariant === 0 && <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9.5" fill="#334155">{2 * R} m</text>}
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_parabolic_gate_2cords') {
    const ww = params.w ?? 3;
    const HH = params.H ?? 8;
    const width = compact ? 255 : 290;
    const height = compact ? 205 : 230;
    const cx = width / 2;
    const topY = 26;
    const botY = height - 28;
    const spanY = botY - topY;
    const halfX = compact ? 76 : 86;
    // y = -(H/w^2)x^2 -> at fraction f of width, y drop = f^2 * spanY
    const pPts: string[] = [];
    for (let i = -30; i <= 30; i++) {
      const f = i / 30;
      const px = cx + f * halfX;
      const py = topY + f * f * spanY;
      pPts.push(`${i === -30 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`);
    }
    const f1 = Math.pow(0.25, 1 / 3); // x1 / w = (1/4)^(1/3) ~ 0.630
    const f2 = Math.pow(0.5, 1 / 3);  // x2 / w = (1/2)^(1/3) ~ 0.794
    const y1 = topY + f1 * f1 * spanY;
    const y2 = topY + f2 * f2 * spanY;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Axes */}
          <line x1={cx - halfX - 24} y1={topY} x2={cx + halfX + 24} y2={topY} stroke="#334155" strokeWidth="1.15" />
          <line x1={cx} y1={botY + 12} x2={cx} y2={topY - 16} stroke="#334155" strokeWidth="1.15" />
          <path d={pPts.join(' ')} fill="none" stroke="#0f172a" strokeWidth="1.8" />
          {/* Cords AB and CD */}
          <line x1={cx - f1 * halfX} y1={y1} x2={cx + f1 * halfX} y2={y1} stroke="#0284c7" strokeWidth="1.6" />
          <line x1={cx - f2 * halfX} y1={y2} x2={cx + f2 * halfX} y2={y2} stroke="#d97706" strokeWidth="1.6" />
          <line x1={cx - halfX} y1={topY} x2={cx - halfX} y2={botY} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2.5" />
          <line x1={cx + f1 * halfX} y1={topY} x2={cx + f1 * halfX} y2={y1} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2.5 2.5" />
          <line x1={cx + f2 * halfX} y1={topY} x2={cx + f2 * halfX} y2={y2} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2.5 2.5" />
          {/* Dimension width & height */}
          <line x1={cx - halfX} y1={botY + 8} x2={cx + halfX} y2={botY + 8} stroke="#475569" strokeWidth="0.9" />
          <text x={cx} y={botY + 20} textAnchor="middle" fontSize="9.5" fill="#0f172a">{2 * ww} m</text>
          <line x1={cx + halfX + 12} y1={topY} x2={cx + halfX + 12} y2={botY} stroke="#475569" strokeWidth="0.9" />
          <text x={cx + halfX + 17} y={(topY + botY) / 2 + 3} fontSize="9.5" fill="#0f172a">{HH} m</text>
          {/* Labels */}
          <text x={cx + 5} y={topY - 4} fontSize="9.5" fontStyle="italic" fill="#0f172a">O</text>
          <text x={cx - halfX} y={topY - 4} textAnchor="middle" fontSize="9.5" fill="#0f172a">-{ww}</text>
          <text x={cx - 12} y={botY + 3} textAnchor="end" fontSize="9.5" fill="#0f172a">-{HH}</text>
          <text x={cx + f1 * halfX} y={topY - 4} textAnchor="middle" fontSize="9" fontStyle="italic" fill="#0284c7">x₁</text>
          <text x={cx + f2 * halfX + 3} y={topY - 4} textAnchor="start" fontSize="9" fontStyle="italic" fill="#d97706">x₂</text>
          <text x={cx - f1 * halfX - 10} y={y1 + 3} fontSize="9.5" fontStyle="italic" fill="#0284c7">A</text>
          <text x={cx + f1 * halfX + 4} y={y1 + 3} fontSize="9.5" fontStyle="italic" fill="#0284c7">B</text>
          <text x={cx - f2 * halfX - 10} y={y2 + 3} fontSize="9.5" fontStyle="italic" fill="#d97706">C</text>
          <text x={cx + f2 * halfX + 4} y={y2 + 3} fontSize="9.5" fontStyle="italic" fill="#d97706">D</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_square_4parabolas_cut') {
    const L = params.L ?? 11;
    const w = compact ? 220 : 250;
    const h = compact ? 200 : 225;
    const s = compact ? 136 : 154;
    const x0 = (w - s) / 2;
    const y0 = 20;
    const cx = x0 + s / 2;
    const cy = y0 + s / 2;
    const dCut = s * 0.34; // depth
    const halfW = s * 0.28;
    const topP = `M ${cx - halfW} ${y0} Q ${cx} ${y0 + 2 * dCut} ${cx + halfW} ${y0} Z`;
    const botP = `M ${cx - halfW} ${y0 + s} Q ${cx} ${y0 + s - 2 * dCut} ${cx + halfW} ${y0 + s} Z`;
    const leftP = `M ${x0} ${cy - halfW} Q ${x0 + 2 * dCut} ${cy} ${x0} ${cy + halfW} Z`;
    const rightP = `M ${x0 + s} ${cy - halfW} Q ${x0 + s - 2 * dCut} ${cy} ${x0 + s} ${cy + halfW} Z`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <rect x={x0} y={y0} width={s} height={s} fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
          <path d={topP} fill="#ffffff" />
          <path d={botP} fill="#ffffff" />
          <path d={leftP} fill="#ffffff" />
          <path d={rightP} fill="#ffffff" />
          <line x1={x0 + s - dCut} y1={cy} x2={x0 + s} y2={cy} stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1={x0 + s} y1={cy - halfW} x2={x0 + s} y2={cy + halfW} stroke="#dc2626" strokeWidth="1.4" />
          <circle cx={x0 + s - dCut} cy={cy} r="2.2" fill="#dc2626" />
          <circle cx={x0 + s} cy={cy} r="2.2" fill="#dc2626" />
          <circle cx={x0 + s} cy={cy - halfW} r="2.2" fill="#dc2626" />
          <circle cx={x0 + s} cy={cy + halfW} r="2.2" fill="#dc2626" />
          <text x={x0 + s - dCut - 8} y={cy - 4} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={x0 + s + 5} y={cy - halfW + 3} fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={x0 + s + 5} y={cy + halfW + 3} fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={x0 + s + 5} y={cy + 3} fontSize="10" fontStyle="italic" fill="#0f172a">H</text>
          <text x={cx} y={y0 + s + 16} textAnchor="middle" fontSize="10" fill="#334155">Cạnh {L} cm</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_square_4petals') {
    const a = params.a ?? 4;
    const w = compact ? 205 : 230;
    const h = compact ? 205 : 230;
    const s = compact ? 136 : 154;
    const x0 = (w - s) / 2;
    const y0 = 18;
    const cx = x0 + s / 2;
    const cy = y0 + s / 2;
    const half = s / 2;
    // 4 petals from O=(cx,cy) to each corner using quadratic curves tangent to axes
    const petalNE = `M ${cx} ${cy} Q ${cx + half} ${cy} ${cx + half} ${cy - half} Q ${cx} ${cy - half} ${cx} ${cy} Z`;
    const petalNW = `M ${cx} ${cy} Q ${cx} ${cy - half} ${cx - half} ${cy - half} Q ${cx - half} ${cy} ${cx} ${cy} Z`;
    const petalSW = `M ${cx} ${cy} Q ${cx - half} ${cy} ${cx - half} ${cy + half} Q ${cx} ${cy + half} ${cx} ${cy} Z`;
    const petalSE = `M ${cx} ${cy} Q ${cx} ${cy + half} ${cx + half} ${cy + half} Q ${cx + half} ${cy} ${cx} ${cy} Z`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <rect x={x0} y={y0} width={s} height={s} fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
          <path d={petalNE} fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
          <path d={petalNW} fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
          <path d={petalSW} fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
          <path d={petalSE} fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
          <text x={cx} y={y0 + s + 16} textAnchor="middle" fontSize="10" fill="#334155">Cạnh {a} cm</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_double_parabola_arch') {
    const W2 = params.W2 ?? 7;
    const H2 = params.H2 ?? 5;
    const W1 = params.W1 ?? 4;
    const H1 = params.H1 ?? 3;
    const w = compact ? 260 : 300;
    const h = compact ? 175 : 196;
    const cx = w / 2;
    const baseY = h - 32;
    const halfOut = compact ? 92 : 106;
    const hOutPx = compact ? 105 : 118;
    const halfIn = halfOut * (W1 / Math.max(1, W2));
    const hInPx = hOutPx * (H1 / Math.max(1, H2));
    const outerArch = `M ${cx - halfOut} ${baseY} Q ${cx} ${baseY - 2 * hOutPx} ${cx + halfOut} ${baseY}`;
    const innerArch = `M ${cx + halfIn} ${baseY} Q ${cx} ${baseY - 2 * hInPx} ${cx - halfIn} ${baseY}`;
    const ringD = `${outerArch} L ${cx + halfIn} ${baseY} Q ${cx} ${baseY - 2 * hInPx} ${cx - halfIn} ${baseY} Z`;
    const patId = `l13-da-${W2}-${H2}`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#64748b" strokeWidth="1.2" />
            </pattern>
          </defs>
          <path d={ringD} fill={`url(#${patId})`} opacity="0.6" />
          <path d={outerArch} fill="none" stroke="#0f172a" strokeWidth="1.8" />
          <path d={innerArch} fill="none" stroke="#0f172a" strokeWidth="1.6" />
          <line x1={cx - halfOut - 10} y1={baseY} x2={cx + halfOut + 10} y2={baseY} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={cx} y1={baseY} x2={cx} y2={baseY - hOutPx} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2.5" />
          <text x={cx} y={baseY + 18} textAnchor="middle" fontSize="9.5" fill="#334155">Ngoài: {W2} m × {H2} m; Trong: {W1} m × {H1} m</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_rect_inscribed_parabola') {
    const area = params.area ?? 219;
    const w = compact ? 255 : 290;
    const h = compact ? 155 : 175;
    const rx = 38;
    const ry = 22;
    const rw = w - rx * 2;
    const rh = h - ry - 34;
    const patId = `l13-rip-${area}`;
    const paraD = `M ${rx} ${ry + rh} Q ${rx + rw / 2} ${ry - rh} ${rx + rw} ${ry + rh} Z`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#2563eb" strokeWidth="1.1" />
            </pattern>
          </defs>
          <rect x={rx} y={ry} width={rw} height={rh} fill="#ffffff" stroke="#0f172a" strokeWidth="1.6" />
          <path d={paraD} fill={`url(#${patId})`} opacity="0.55" stroke="#2563eb" strokeWidth="1.8" />
          <circle cx={rx + rw / 2} cy={ry} r="2.3" fill="#2563eb" />
          <text x={rx + rw / 2} y={ry + rh + 18} textAnchor="middle" fontSize="9.5" fill="#334155">Diện tích hình chữ nhật = {area} m²</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_rect_two_side_parabolas') {
    const W = params.W ?? 27;
    const L = params.L ?? 57;
    const p = params.p ?? 10;
    const w = compact ? 270 : 306;
    const h = compact ? 165 : 185;
    const rx = 34;
    const ry = 24;
    const rw = w - rx * 2;
    const rh = h - ry - 32;
    const pPx = Math.min(rw * 0.42, (p / Math.max(1, L)) * rw * 1.4);
    const leftP = `M ${rx} ${ry} Q ${rx + 2 * pPx} ${ry + rh / 2} ${rx} ${ry + rh}`;
    const rightP = `M ${rx + rw} ${ry} Q ${rx + rw - 2 * pPx} ${ry + rh / 2} ${rx + rw} ${ry + rh}`;
    const midAreaD = `M ${rx} ${ry} L ${rx + rw} ${ry} Q ${rx + rw - 2 * pPx} ${ry + rh / 2} ${rx + rw} ${ry + rh} L ${rx} ${ry + rh} Q ${rx + 2 * pPx} ${ry + rh / 2} ${rx} ${ry} Z`;
    const patId = `l13-rtsp-${W}-${L}-${p}`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#2563eb" strokeWidth="1.1" />
            </pattern>
          </defs>
          <path d={midAreaD} fill={`url(#${patId})`} opacity="0.4" />
          <rect x={rx} y={ry} width={rw} height={rh} fill="none" stroke="#0f172a" strokeWidth="1.6" />
          <path d={leftP} fill="none" stroke="#1d4ed8" strokeWidth="1.8" />
          <path d={rightP} fill="none" stroke="#1d4ed8" strokeWidth="1.8" />
          <line x1={rx + rw / 2} y1={ry - 8} x2={rx + rw / 2} y2={ry + rh + 8} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2.5" />
          <circle cx={rx + pPx} cy={ry + rh / 2} r="2.5" fill="#1d4ed8" />
          <text x={rx - 10} y={ry + rh + 6} fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={rx + rw + 4} y={ry + rh + 6} fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={rx + rw + 4} y={ry - 3} fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={rx - 10} y={ry - 3} fontSize="10" fontStyle="italic" fill="#0f172a">D</text>
          <text x={rx + pPx + 7} y={ry + rh / 2 + 3} fontSize="10" fontStyle="italic" fill="#1d4ed8">I</text>
          <text x={rx + rw / 2} y={ry + rh + 20} textAnchor="middle" fontSize="9.5" fill="#334155">{L} m × {W} m (lấn {p} m)</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_ellipse_two_parabolas') {
    const a = params.a ?? 4;
    const b = params.b ?? 2;
    const w = compact ? 270 : 306;
    const h = compact ? 170 : 192;
    const cx = w / 2;
    const cy = h / 2;
    const rx = compact ? 102 : 116;
    const ry = compact ? 52 : 60;
    // M, N, P, Q at (±0.5 rx, ±sqrt(3)/2 ry)
    const mx = 0.5 * rx;
    const my = (Math.sqrt(3) / 2) * ry;
    // Right parabola x = c y^2 passing through (0,0) and (mx, ±my) -> Quadratic bezier from (mx, -my) to (mx, my) with control (-mx, 0)
    // Shade left & right caps between ellipse arc and parabola:
    const leftPts: string[] = [];
    for (let deg = 120; deg <= 240; deg += 4) {
      const rad = (deg * Math.PI) / 180;
      leftPts.push(`${deg === 120 ? 'M' : 'L'} ${(cx + rx * Math.cos(rad)).toFixed(1)} ${(cy + ry * Math.sin(rad)).toFixed(1)}`);
    }
    leftPts.push(`Q ${cx + mx} ${cy} ${(cx - mx).toFixed(1)} ${(cy - my).toFixed(1)} Z`);
    const rightPts: string[] = [];
    for (let deg = -60; deg <= 60; deg += 4) {
      const rad = (deg * Math.PI) / 180;
      rightPts.push(`${deg === -60 ? 'M' : 'L'} ${(cx + rx * Math.cos(rad)).toFixed(1)} ${(cy + ry * Math.sin(rad)).toFixed(1)}`);
    }
    rightPts.push(`Q ${cx - mx} ${cy} ${(cx + mx).toFixed(1)} ${(cy - my).toFixed(1)} Z`);

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <path d={leftPts.join(' ')} fill="#fed7aa" fillOpacity="0.85" />
          <path d={rightPts.join(' ')} fill="#fed7aa" fillOpacity="0.85" />
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#dc2626" strokeWidth="1.6" />
          <path d={`M ${cx - mx} ${cy - my} Q ${cx + mx} ${cy} ${cx - mx} ${cy + my}`} fill="none" stroke="#0f172a" strokeWidth="1.6" />
          <path d={`M ${cx + mx} ${cy - my} Q ${cx - mx} ${cy} ${cx + mx} ${cy + my}`} fill="none" stroke="#0f172a" strokeWidth="1.6" />
          <line x1={cx - mx} y1={cy - my} x2={cx + mx} y2={cy - my} stroke="#94a3b8" strokeWidth="0.9" strokeDasharray="3 2" />
          <line x1={cx - mx} y1={cy + my} x2={cx + mx} y2={cy + my} stroke="#94a3b8" strokeWidth="0.9" strokeDasharray="3 2" />
          <text x={cx - rx - 14} y={cy + 3} fontSize="9.5" fontStyle="italic" fill="#0f172a">A₁</text>
          <text x={cx + rx + 4} y={cy + 3} fontSize="9.5" fontStyle="italic" fill="#0f172a">A₂</text>
          <text x={cx - 10} y={cy - ry - 5} fontSize="9.5" fontStyle="italic" fill="#0f172a">B₂</text>
          <text x={cx - 10} y={cy + ry + 11} fontSize="9.5" fontStyle="italic" fill="#0f172a">B₁</text>
          <text x={cx - mx - 12} y={cy - my - 3} fontSize="9.5" fontStyle="italic" fill="#0f172a">M</text>
          <text x={cx + mx + 4} y={cy - my - 3} fontSize="9.5" fontStyle="italic" fill="#0f172a">N</text>
          <text x={cx - mx - 11} y={cy + my + 9} fontSize="9.5" fontStyle="italic" fill="#0f172a">Q</text>
          <text x={cx + mx + 4} y={cy + my + 9} fontSize="9.5" fontStyle="italic" fill="#0f172a">P</text>
          <text x={cx} y={h - 6} textAnchor="middle" fontSize="9.5" fill="#334155">Elip {2 * a} m × {2 * b} m, MN = {a} m</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l13_vase_profile') {
    const L = params.L ?? 5;
    const r = params.r ?? 1;
    const w = compact ? 270 : 306;
    const h = compact ? 155 : 175;
    const xA = 44;
    const yBase = h - 38;
    const lenPx = w - 88;
    const hPx = 88;
    const k = (L - r) / 2; // x of circle center relative to A
    const xE = xA + ((L - r) / L) * lenPx;
    const xB = xA + lenPx;
    const yTop = yBase - hPx;
    const yM = yBase - (r / (2.5 * r)) * hPx;
    // Draw horizontal orientation (A bottom-left, B bottom-right) matching rotation axis AB
    const pts: string[] = [`M ${xA} ${yM.toFixed(1)}`];
    const R = Math.sqrt(r * r + k * k);
    for (let i = 0; i <= 32; i++) {
      const x = ((L - r) * i) / 32;
      const y = Math.sqrt(Math.max(0, R * R - (x - k) * (x - k)));
      const px = xA + (x / L) * lenPx;
      const py = yBase - (y / (2.5 * r)) * hPx;
      pts.push(`L ${px.toFixed(1)} ${py.toFixed(1)}`);
    }
    const alpha = k / (r * r);
    for (let i = 1; i <= 16; i++) {
      const x = (L - r) + (r * i) / 16;
      const y = alpha * (x - (L - r)) * (x - L) + r;
      const px = xA + (x / L) * lenPx;
      const py = yBase - (y / (2.5 * r)) * hPx;
      pts.push(`L ${px.toFixed(1)} ${py.toFixed(1)}`);
    }
    const shadeD = `${pts.join(' ')} L ${xB} ${yBase} L ${xA} ${yBase} Z`;
    const patId = `l13-vp-${L}-${r}`;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <pattern id={patId} width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#64748b" strokeWidth="1.15" />
            </pattern>
          </defs>
          <rect x={xA} y={yTop} width={lenPx} height={hPx} fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
          <path d={shadeD} fill={`url(#${patId})`} opacity="0.65" stroke="#0f172a" strokeWidth="1.6" />
          <line x1={xA} y1={yM} x2={xB} y2={yM} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />
          <line x1={xE} y1={yBase} x2={xE} y2={yM} stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />
          <text x={xA - 10} y={yBase + 12} fontSize="9.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x={xB + 4} y={yBase + 12} fontSize="9.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x={xB + 4} y={yTop + 4} fontSize="9.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={xA - 11} y={yTop + 4} fontSize="9.5" fontStyle="italic" fill="#0f172a">D</text>
          <text x={xA - 12} y={yM + 3} fontSize="9.5" fontStyle="italic" fill="#0f172a">M</text>
          <text x={xE - 4} y={yM - 6} fontSize="9.5" fontStyle="italic" fill="#0f172a">N</text>
          <text x={xB + 4} y={yM + 3} fontSize="9.5" fontStyle="italic" fill="#0f172a">P</text>
          <text x={xE - 3} y={yBase + 12} fontSize="9.5" fontStyle="italic" fill="#0f172a">E</text>
          <text x={xA + lenPx / 2} y={yBase + 24} textAnchor="middle" fontSize="9.5" fill="#334155">AB = {L} dm, AM = BE = {r} dm</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l14_stadium_frustum_3d') {
    const w = compact ? 275 : 312;
    const h = compact ? 200 : 225;
    const O = { x: 146, y: 172 };
    const A = { x: 224, y: 145 };
    const D = { x: 74, y: 132 };
    const G = { x: 156, y: 105 };
    const apex = { x: 168, y: 24 };
    const lerp = (p: { x: number; y: number }, q: { x: number; y: number }, t: number) => ({
      x: p.x + (q.x - p.x) * t,
      y: p.y + (q.y - p.y) * t,
    });
    const t = 0.65;
    const B = lerp(apex, O, t);
    const C = lerp(apex, A, t);
    const F = lerp(apex, G, t);
    const E = lerp(apex, D, t);
    const xEnd = { x: 266, y: 130 };
    const yEnd = { x: 38, y: 112 };
    const zEnd = { x: O.x, y: 20 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <marker id="l14-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
            </marker>
          </defs>
          <line x1={A.x} y1={A.y} x2={G.x} y2={G.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1={G.x} y1={G.y} x2={D.x} y2={D.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1={F.x} y1={F.y} x2={G.x} y2={G.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <polygon points={`${B.x},${B.y} ${C.x},${C.y} ${F.x},${F.y} ${E.x},${E.y}`} fill="#e0f2fe" fillOpacity="0.35" stroke="#0f172a" strokeWidth="1.45" />
          <polyline points={`${A.x},${A.y} ${O.x},${O.y} ${D.x},${D.y}`} fill="none" stroke="#0f172a" strokeWidth="1.45" />
          <line x1={E.x} y1={E.y} x2={D.x} y2={D.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={B.x} y1={B.y} x2={O.x} y2={O.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={A.x} y1={A.y} x2={xEnd.x} y2={xEnd.y} stroke="#0284c7" strokeWidth="1.3" markerEnd="url(#l14-arrow)" />
          <line x1={D.x} y1={D.y} x2={yEnd.x} y2={yEnd.y} stroke="#0284c7" strokeWidth="1.3" markerEnd="url(#l14-arrow)" />
          <line x1={O.x} y1={O.y} x2={zEnd.x} y2={zEnd.y} stroke="#0284c7" strokeWidth="1.3" markerEnd="url(#l14-arrow)" />
          {[O, A, D, G, B, C, F, E].map((pt, idx) => (
            <circle key={idx} cx={pt.x} cy={pt.y} r="2.2" fill="#0f172a" />
          ))}
          <text x={O.x + 2} y={O.y + 14} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={A.x + 3} y={A.y + 13} fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={D.x - 10} y={D.y + 12} fontSize="10" fontStyle="italic" fill="#0f172a">D</text>
          <text x={G.x + 6} y={G.y - 3} fontSize="10" fontStyle="italic" fill="#0f172a">G</text>
          <text x={B.x + 5} y={B.y + 11} fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 6} y={C.y + 3} fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={E.x - 13} y={E.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">E</text>
          <text x={F.x + 2} y={F.y - 6} fontSize="10" fontStyle="italic" fill="#0f172a">F</text>
          <text x={xEnd.x + 4} y={xEnd.y + 8} fontSize="10.5" fontStyle="italic" fill="#0284c7">x</text>
          <text x={yEnd.x - 10} y={yEnd.y + 4} fontSize="10.5" fontStyle="italic" fill="#0284c7">y</text>
          <text x={zEnd.x - 12} y={zEnd.y + 6} fontSize="10.5" fontStyle="italic" fill="#0284c7">z</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l14_trapezoid_yard_2d') {
    const ab = params.ab ?? 8;
    const ad = params.ad ?? 4;
    const bc = params.bc ?? 8;
    const w = compact ? 245 : 276;
    const h = compact ? 155 : 176;
    const left = 54;
    const top = 34;
    const widthPx = 152;
    const maxSide = Math.max(ad, bc, 1);
    const scaleY = 90 / maxSide;
    const adPx = ad * scaleY;
    const bcPx = bc * scaleY;
    const A = { x: left, y: top };
    const B = { x: left + widthPx, y: top };
    const C = { x: left + widthPx, y: top + bcPx };
    const D = { x: left, y: top + adPx };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="#f8fafc" stroke="#0f172a" strokeWidth="1.6" />
          <polyline points={`${A.x + 10},${A.y} ${A.x + 10},${A.y + 10} ${A.x},${A.y + 10}`} fill="none" stroke="#475569" strokeWidth="1" />
          <polyline points={`${B.x - 10},${B.y} ${B.x - 10},${B.y + 10} ${B.x},${B.y + 10}`} fill="none" stroke="#475569" strokeWidth="1" />
          {[A, B, C, D].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2.2" fill="#0f172a" />
          ))}
          <text x={A.x - 4} y={A.y - 8} fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x + 2} y={B.y - 8} fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 2} y={C.y + 13} fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={D.x - 6} y={D.y + 13} fontSize="10.5" fontStyle="italic" fill="#0f172a">D</text>
          <text x={(A.x + B.x) / 2} y={A.y - 8} textAnchor="middle" fontSize="10" fill="#334155">{ab} m</text>
          <text x={B.x + 8} y={(B.y + C.y) / 2 + 3} fontSize="10" fill="#334155">{bc} m</text>
          <text x={A.x - 8} y={(A.y + D.y) / 2 + 3} textAnchor="end" fontSize="10" fill="#334155">{ad} m</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l14_camera_cone_3d') {
    const w = compact ? 275 : 308;
    const h = compact ? 168 : 190;
    const cx = w / 2 + 6;
    const cy = h - 54;
    const rx = 68;
    const ry = 22;
    const ax = cx;
    const ay = 34;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={`46,${cy + 36} ${w - 64},${cy + 36} ${w - 18},${cy - 44} 92,${cy - 44}`} fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
          <path d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`} fill="none" stroke="#64748b" strokeWidth="1.25" strokeDasharray="4 3" />
          <path d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`} fill="#e0f2fe" fillOpacity="0.35" stroke="#0f172a" strokeWidth="1.45" />
          <line x1={cx - rx} y1={cy} x2={cx + rx} y2={cy} stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 3" />
          <line x1={ax} y1={ay} x2={cx} y2={cy} stroke="#64748b" strokeWidth="1.15" strokeDasharray="3.5 3" />
          <line x1={ax} y1={ay} x2={cx - rx} y2={cy} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={ax} y1={ay} x2={cx + rx} y2={cy} stroke="#0f172a" strokeWidth="1.45" />
          <path d={`M ${ax - 15} ${ay + 18} Q ${ax} ${ay + 25} ${ax + 15} ${ay + 18}`} fill="none" stroke="#0284c7" strokeWidth="1.2" />
          <circle cx={ax} cy={ay} r="2.3" fill="#0f172a" />
          <circle cx={cx} cy={cy} r="2" fill="#0f172a" />
          <circle cx={cx - rx} cy={cy} r="2" fill="#0f172a" />
          <circle cx={cx + rx} cy={cy} r="2" fill="#0f172a" />
          <text x={ax} y={ay - 8} textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
          <text x={cx + 3} y={cy + 13} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={cx - rx - 12} y={cy + 4} fontSize="10.5" fontStyle="italic" fill="#0f172a">B</text>
          <text x={cx + rx + 5} y={cy + 4} fontSize="10.5" fontStyle="italic" fill="#0f172a">C</text>
          <text x={58} y={cy + 28} fontSize="10" fontStyle="italic" fill="#334155">P</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l14_museum_box_pane_3d') {
    const w = compact ? 258 : 292;
    const h = compact ? 205 : 230;
    const O = { x: 96, y: h - 54 };
    const A = { x: 56, y: h - 26 };
    const C = { x: 204, y: h - 54 };
    const B = { x: 164, y: h - 26 };
    const boxH = 110;
    const D = { x: O.x, y: O.y - boxH };
    const E = { x: A.x, y: A.y - boxH };
    const G = { x: C.x, y: C.y - boxH };
    const F = { x: B.x, y: B.y - boxH };
    const P = { x: A.x, y: A.y - boxH * 0.35 };
    const Q = { x: C.x, y: C.y - boxH * 0.65 };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={`${O.x},${O.y} ${P.x},${P.y} ${F.x},${F.y} ${Q.x},${Q.y}`} fill="#fef08a" fillOpacity="0.65" stroke="none" />
          <line x1={A.x} y1={A.y} x2={O.x} y2={O.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={O.x} y1={O.y} x2={D.x} y2={D.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#b45309" strokeWidth="1.35" strokeDasharray="3.5 3" />
          <line x1={O.x} y1={O.y} x2={Q.x} y2={Q.y} stroke="#b45309" strokeWidth="1.35" strokeDasharray="3.5 3" />
          <polygon points={`${D.x},${D.y} ${E.x},${E.y} ${F.x},${F.y} ${G.x},${G.y}`} fill="none" stroke="#0f172a" strokeWidth="1.4" />
          <polyline points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke="#0f172a" strokeWidth="1.4" />
          <line x1={A.x} y1={A.y} x2={E.x} y2={E.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={B.x} y1={B.y} x2={F.x} y2={F.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={C.x} y1={C.y} x2={G.x} y2={G.y} stroke="#0f172a" strokeWidth="1.4" />
          <line x1={P.x} y1={P.y} x2={F.x} y2={F.y} stroke="#b45309" strokeWidth="1.5" />
          <line x1={Q.x} y1={Q.y} x2={F.x} y2={F.y} stroke="#b45309" strokeWidth="1.5" />
          {[O, A, B, C, D, E, F, G, P, Q].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2.1" fill="#0f172a" />
          ))}
          <text x={O.x - 11} y={O.y + 11} fontSize="10" fontStyle="italic" fill="#0f172a">O</text>
          <text x={A.x - 12} y={A.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">A</text>
          <text x={B.x + 5} y={B.y + 11} fontSize="10" fontStyle="italic" fill="#0f172a">B</text>
          <text x={C.x + 6} y={C.y + 4} fontSize="10" fontStyle="italic" fill="#0f172a">C</text>
          <text x={D.x - 12} y={D.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">D</text>
          <text x={E.x - 12} y={E.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">E</text>
          <text x={F.x + 4} y={F.y - 6} fontSize="10" fontStyle="italic" fill="#0f172a">F</text>
          <text x={G.x + 6} y={G.y + 2} fontSize="10" fontStyle="italic" fill="#0f172a">G</text>
          <text x={P.x - 12} y={P.y + 3} fontSize="10" fontStyle="italic" fill="#b45309">P</text>
          <text x={Q.x + 6} y={Q.y + 3} fontSize="10" fontStyle="italic" fill="#b45309">Q</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l15_signal_line_3d') {
    const w = compact ? 265 : 298;
    const h = compact ? 185 : 210;
    const lineX = 76;
    const px = 204;
    const py = 58;
    const iy = 58;
    const ay = 148;
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {/* Concentric radio waves around P */}
          {[16, 28, 40, 52].map((r, idx) => (
            <circle key={idx} cx={px} cy={py} r={r} fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity={0.75 - idx * 0.14} />
          ))}
          {/* Transmitter tower */}
          <polygon points={`${px},${py} ${px - 11},${py + 20} ${px + 11},${py + 20}`} fill="#f8fafc" stroke="#0f172a" strokeWidth="1.4" />
          <circle cx={px} cy={py} r="4.5" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" />
          <text x={px + 8} y={py - 12} fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">P</text>
          {/* Line d */}
          <line x1={lineX} y1="22" x2={lineX} y2={h - 16} stroke="#2563eb" strokeWidth="1.7" strokeDasharray="5 4" />
          <text x={lineX - 12} y="28" fontSize="11" fontStyle="italic" fill="#1d4ed8">d</text>
          {/* Closest & moving ray */}
          <line x1={lineX} y1={iy} x2={px} y2={py} stroke="#ea580c" strokeWidth="1.8" />
          <line x1={lineX} y1={ay} x2={px} y2={py} stroke="#f97316" strokeWidth="1.35" strokeDasharray="4 3" />
          <polyline points={`${lineX},${iy + 8} ${lineX + 8},${iy + 8} ${lineX + 8},${iy}`} fill="none" stroke="#475569" strokeWidth="1" />
          <circle cx={lineX} cy={iy} r="2.8" fill="#ea580c" />
          <circle cx={lineX} cy={ay} r="2.8" fill="#0f172a" />
          <text x={lineX - 14} y={iy + 4} fontSize="10.5" fontStyle="italic" fill="#ea580c">I</text>
          <text x={lineX - 15} y={ay + 4} fontSize="10.5" fontStyle="italic" fill="#0f172a">A</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l15_cube_two_ants_3d') {
    const a = params.a ?? 10;
    const w = compact ? 255 : 290;
    const h = compact ? 205 : 230;
    const B = { x: 52, y: h - 46 };
    const C = { x: w - 76, y: h - 46 };
    const A = { x: 96, y: h - 82 };
    const D = { x: w - 32, y: h - 82 };
    const boxH = compact ? 92 : 104;
    const B1 = { x: B.x, y: B.y - boxH };
    const C1 = { x: C.x, y: C.y - boxH };
    const A1 = { x: A.x, y: A.y - boxH };
    const D1 = { x: D.x, y: D.y - boxH };
    const antYellow = { x: A.x + 0.25 * (D1.x - A.x), y: A.y + 0.25 * (D1.y - A.y) };
    const antBrown = { x: D.x + 0.22 * (B.x - D.x), y: D.y + 0.22 * (B.y - D.y) };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={`${A1.x},${A1.y} ${B1.x},${B1.y} ${C1.x},${C1.y} ${D1.x},${D1.y}`} fill="#e0f2fe" fillOpacity="0.25" />
          {/* Hidden cube edges & diagonals AD', BD */}
          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1={A.x} y1={A.y} x2={A1.x} y2={A1.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1={A.x} y1={A.y} x2={D1.x} y2={D1.y} stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1={D.x} y1={D.y} x2={B.x} y2={B.y} stroke="#78350f" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Visible cube edges */}
          <polyline points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="none" stroke="#0f172a" strokeWidth="1.45" />
          <polygon points={`${B1.x},${B1.y} ${C1.x},${C1.y} ${D1.x},${D1.y} ${A1.x},${A1.y}`} fill="none" stroke="#0f172a" strokeWidth="1.45" />
          <line x1={B.x} y1={B.y} x2={B1.x} y2={B1.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={C.x} y1={C.y} x2={C1.x} y2={C1.y} stroke="#0f172a" strokeWidth="1.45" />
          <line x1={D.x} y1={D.y} x2={D1.x} y2={D1.y} stroke="#0f172a" strokeWidth="1.45" />
          {/* Ant icons */}
          <g transform={`translate(${antYellow.x}, ${antYellow.y}) rotate(-32)`}>
            <ellipse cx="-4" cy="0" rx="3.4" ry="2.2" fill="#facc15" stroke="#b45309" strokeWidth="0.9" />
            <ellipse cx="0.5" cy="0" rx="2.3" ry="1.7" fill="#facc15" stroke="#b45309" strokeWidth="0.9" />
            <circle cx="3.8" cy="0" r="1.7" fill="#facc15" stroke="#b45309" strokeWidth="0.9" />
          </g>
          <g transform={`translate(${antBrown.x}, ${antBrown.y}) rotate(-12)`}>
            <ellipse cx="4" cy="0" rx="3.4" ry="2.2" fill="#451a03" stroke="#1c1917" strokeWidth="0.9" />
            <ellipse cx="-0.5" cy="0" rx="2.3" ry="1.7" fill="#451a03" stroke="#1c1917" strokeWidth="0.9" />
            <circle cx="-3.8" cy="0" r="1.7" fill="#451a03" stroke="#1c1917" strokeWidth="0.9" />
          </g>
          {[A, B, C, D, A1, B1, C1, D1].map((pt, idx) => (
            <circle key={idx} cx={pt.x} cy={pt.y} r="2.1" fill="#0f172a" />
          ))}
          <text x={B.x - 10} y={B.y + 11} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">B</text>
          <text x={C.x + 5} y={C.y + 11} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">C</text>
          <text x={A.x - 12} y={A.y + 3} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">A</text>
          <text x={D.x + 6} y={D.y + 4} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">D</text>
          <text x={B1.x - 14} y={B1.y - 4} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">B&apos;</text>
          <text x={C1.x + 6} y={C1.y + 2} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">C&apos;</text>
          <text x={A1.x - 14} y={A1.y - 4} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">A&apos;</text>
          <text x={D1.x + 6} y={D1.y - 4} fontSize="10" fontStyle="italic" fontWeight="600" fill="#0f172a">D&apos;</text>
          <text x={w / 2} y={h - 10} textAnchor="middle" fontSize="9.5" fill="#334155">Hình lập phương cạnh {a} cm</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l17_earth_tangent_orbit_3d') {
    const w = compact ? 265 : 300;
    const h = compact ? 185 : 210;
    const O = { x: compact ? 92 : 104, y: compact ? 102 : 115 };
    const r = compact ? 64 : 74;
    const ry = r * 0.2;
    const d = r * 0.38;
    const H = { x: O.x, y: O.y - d };
    const ra = Math.sqrt(r * r - d * d);
    const rb = r * 0.13;
    const ang = (60 * Math.PI) / 180;
    const A = { x: H.x + ra * Math.cos(ang), y: H.y - rb * Math.sin(ang) };
    const M = { x: O.x + r * 1.65, y: H.y };
    const vx = H.x - A.x;
    const vy = H.y - A.y;
    const vLen = Math.hypot(vx, vy) || 1;
    const ux = M.x - A.x;
    const uy = M.y - A.y;
    const uLen = Math.hypot(ux, uy) || 1;
    const sq = 7;
    const p1 = { x: A.x + (vx / vLen) * sq, y: A.y + (vy / vLen) * sq };
    const p3 = { x: A.x + (ux / uLen) * sq, y: A.y + (uy / uLen) * sq };
    const p2 = { x: p1.x + (ux / uLen) * sq, y: p1.y + (uy / uLen) * sq };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <radialGradient id="earthSphereGrad" cx="38%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.22" />
            </radialGradient>
          </defs>
          <circle cx={O.x} cy={O.y} r={r} fill="url(#earthSphereGrad)" stroke="#0f172a" strokeWidth="1.4" />
          {/* Equator back dashed, front solid */}
          <path
            d={`M ${O.x - r} ${O.y} A ${r} ${ry} 0 0 1 ${O.x + r} ${O.y}`}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.15"
            strokeDasharray="4 3"
          />
          <path
            d={`M ${O.x - r} ${O.y} A ${r} ${ry} 0 0 0 ${O.x + r} ${O.y}`}
            fill="none"
            stroke="#0f172a"
            strokeWidth="1.35"
          />
          {/* Latitude circle back dashed, front solid */}
          <path
            d={`M ${H.x - ra} ${H.y} A ${ra} ${rb} 0 0 1 ${H.x + ra} ${H.y}`}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.15"
            strokeDasharray="3.5 3"
          />
          <path
            d={`M ${H.x - ra} ${H.y} A ${ra} ${rb} 0 0 0 ${H.x + ra} ${H.y}`}
            fill="none"
            stroke="#0284c7"
            strokeWidth="1.25"
          />
          {/* O-H-A dashed, right angle at A, tangent ray A-M */}
          <polyline points={`${O.x},${O.y} ${H.x},${H.y} ${A.x},${A.y}`} fill="none" stroke="#475569" strokeWidth="1.2" strokeDasharray="3.5 3" />
          <polyline points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`} fill="none" stroke="#475569" strokeWidth="1" />
          <line x1={A.x} y1={A.y} x2={M.x} y2={M.y} stroke="#dc2626" strokeWidth="1.75" />
          {[O, H, A, M].map((pt, idx) => (
            <circle key={idx} cx={pt.x} cy={pt.y} r="2.2" fill={idx === 3 ? '#dc2626' : '#0f172a'} />
          ))}
          <text x={O.x - 10} y={O.y + 13} fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#0f172a">O</text>
          <text x={H.x - 12} y={H.y + 3} fontSize="10" fontStyle="italic" fill="#475569">H</text>
          <text x={A.x - 2} y={A.y - 8} fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#0f172a">A</text>
          <text x={M.x + 6} y={M.y + 3} fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#dc2626">M</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b1_unit_circle_point') {
    const w = compact ? 220 : 250;
    const h = compact ? 220 : 250;
    const cx = w / 2;
    const cy = h / 2;
    const R = compact ? 64 : 74;
    const deg = params.deg ?? 180;
    const rad = (deg * Math.PI) / 180;
    const px = cx + R * Math.cos(rad);
    const py = cy - R * Math.sin(rad);
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <marker id="ucArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0.7 L 5.5 3 L 0 5.3 z" fill="#334155" />
            </marker>
          </defs>
          <line x1={cx - R - 26} y1={cy} x2={cx + R + 28} y2={cy} stroke="#334155" strokeWidth="1.2" markerEnd="url(#ucArrow)" />
          <line x1={cx} y1={cy + R + 26} x2={cx} y2={cy - R - 28} stroke="#334155" strokeWidth="1.2" markerEnd="url(#ucArrow)" />
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0f172a" strokeWidth="1.7" />
          <circle cx={cx} cy={cy} r="2.2" fill="#0f172a" />
          <text x={cx - 11} y={cy + 13} fontSize="11" fontStyle="italic" fill="#0f172a">O</text>
          <text x={cx + R + 20} y={cy + 14} fontSize="11" fontStyle="italic" fill="#334155">x</text>
          <text x={cx - 12} y={cy - R - 18} fontSize="11" fontStyle="italic" fill="#334155">y</text>
          <text x={cx + R + 5} y={cy + 13} fontSize="10.5" fill="#334155">1</text>
          <text x={cx - R - 14} y={cy + 13} fontSize="10.5" fill="#334155">-1</text>
          <text x={cx + 6} y={cy - R - 5} fontSize="10.5" fill="#334155">1</text>
          <text x={cx + 6} y={cy + R + 13} fontSize="10.5" fill="#334155">-1</text>
          <circle cx={px} cy={py} r="4.2" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b1_unit_circle_axes') {
    const w = compact ? 230 : 260;
    const h = compact ? 230 : 260;
    const cx = w / 2;
    const cy = h / 2;
    const R = compact ? 66 : 76;
    const pts = [
      { label: 'A', x: cx + R, y: cy, dx: 8, dy: -6 },
      { label: "A'", x: cx - R, y: cy, dx: -16, dy: -6 },
      { label: 'B', x: cx, y: cy - R, dx: 8, dy: -6 },
      { label: "B'", x: cx, y: cy + R, dx: -16, dy: 14 },
    ];
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <marker id="ucAxesArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0.7 L 5.5 3 L 0 5.3 z" fill="#334155" />
            </marker>
          </defs>
          <line x1={cx - R - 28} y1={cy} x2={cx + R + 28} y2={cy} stroke="#334155" strokeWidth="1.2" markerEnd="url(#ucAxesArr)" />
          <line x1={cx} y1={cy + R + 28} x2={cx} y2={cy - R - 28} stroke="#334155" strokeWidth="1.2" markerEnd="url(#ucAxesArr)" />
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx={cx} cy={cy} r="2.5" fill="#0f172a" />
          <text x={cx - 12} y={cy + 14} fontSize="11" fontStyle="italic" fill="#0f172a">O</text>
          <text x={cx + R + 22} y={cy + 14} fontSize="11" fontStyle="italic" fill="#334155">x</text>
          <text x={cx - 12} y={cy - R - 20} fontSize="11" fontStyle="italic" fill="#334155">y</text>
          {pts.map((pt) => (
            <g key={pt.label}>
              <circle cx={pt.x} cy={pt.y} r="3" fill="#0f172a" />
              <text x={pt.x + pt.dx} y={pt.y + pt.dy} fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b1_unit_circle_quad_sym') {
    const w = compact ? 240 : 270;
    const h = compact ? 240 : 270;
    const cx = w / 2;
    const cy = h / 2;
    const R = compact ? 68 : 78;
    const baseDeg = params.baseDeg ?? 60;
    const showArc = (params.showArc ?? 1) === 1;
    const pt = (deg: number) => {
      const r = (deg * Math.PI) / 180;
      return { x: cx + R * Math.cos(r), y: cy - R * Math.sin(r) };
    };
    const M = pt(baseDeg);
    const N = pt(180 - baseDeg);
    const P = pt(-180 + baseDeg);
    const Q = pt(-baseDeg);
    const arcR = R * 0.48;
    const arcEnd = {
      x: cx + arcR * Math.cos((baseDeg * Math.PI) / 180),
      y: cy - arcR * Math.sin((baseDeg * Math.PI) / 180),
    };
    const midRad = ((baseDeg / 2) * Math.PI) / 180;
    const arcLbl = {
      x: cx + (arcR + 18) * Math.cos(midRad),
      y: cy - (arcR + 14) * Math.sin(midRad),
    };
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <marker id="ucQuadArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0.7 L 5.5 3 L 0 5.3 z" fill="#334155" />
            </marker>
          </defs>
          <line x1={cx - R - 30} y1={cy} x2={cx + R + 30} y2={cy} stroke="#334155" strokeWidth="1.2" markerEnd="url(#ucQuadArr)" />
          <line x1={cx} y1={cy + R + 30} x2={cx} y2={cy - R - 30} stroke="#334155" strokeWidth="1.2" markerEnd="url(#ucQuadArr)" />
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0f172a" strokeWidth="1.8" />
          {showArc && (
            <>
              <line x1={cx} y1={cy} x2={M.x} y2={M.y} stroke="#475569" strokeWidth="1.15" strokeDasharray="4 3" />
              <path
                d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 0 ${arcEnd.x} ${arcEnd.y}`}
                fill="none"
                stroke="#0f172a"
                strokeWidth="1.1"
                markerEnd="url(#ucQuadArr)"
              />
              <text x={arcLbl.x} y={arcLbl.y + 3} fontSize="10" textAnchor="middle" fill="#0f172a">
                {baseDeg}°
              </text>
            </>
          )}
          <circle cx={cx} cy={cy} r="2.3" fill="#0f172a" />
          <text x={cx - 12} y={cy + 13} fontSize="11" fontStyle="italic" fill="#0f172a">O</text>
          <text x={cx + R + 24} y={cy + 14} fontSize="11" fontStyle="italic" fill="#334155">x</text>
          <text x={cx - 12} y={cy - R - 20} fontSize="11" fontStyle="italic" fill="#334155">y</text>
          {[
            { name: 'M', p: M, dx: 7, dy: -6 },
            { name: 'N', p: N, dx: -14, dy: -6 },
            { name: 'P', p: P, dx: -14, dy: 14 },
            { name: 'Q', p: Q, dx: 7, dy: 14 },
          ].map((item) => (
            <g key={item.name}>
              <circle cx={item.p.x} cy={item.p.y} r="2.8" fill="#0f172a" />
              <text x={item.p.x + item.dx} y={item.p.y + item.dy} fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">
                {item.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b10_tetra_3d') {
    const lbl = diagram.labels || {};
    const w = compact ? 235 : 265;
    const h = compact ? 172 : 192;
    const vL = { x: 46, y: h - 54 };
    const vF = { x: 102, y: h - 20 };
    const vR = { x: w - 42, y: h - 54 };
    const apex = { x: 106, y: 24 };
    const showCentroid = (params.showCentroid ?? 0) === 1;
    const midEdge = params.midEdge ?? 0; // 0: none, 1: vF-vR, 2: vL-vF, 3: vL-vR
    const showMedians = (params.showMedians ?? 0) === 1;
    const midFR = { x: (vF.x + vR.x) / 2, y: (vF.y + vR.y) / 2 };
    const midLF = { x: (vL.x + vF.x) / 2, y: (vL.y + vF.y) / 2 };
    const midLR = { x: (vL.x + vR.x) / 2, y: (vL.y + vR.y) / 2 };
    const cent = { x: (vL.x + vF.x + vR.x) / 3, y: (vL.y + vF.y + vR.y) / 3 };
    const activeMid = midEdge === 1 ? midFR : midEdge === 2 ? midLF : midEdge === 3 ? midLR : null;

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={vL.x} y1={vL.y} x2={vR.x} y2={vR.y} stroke="#64748b" strokeWidth="1.25" strokeDasharray="4 3" />
          {showMedians && (
            <>
              <line x1={vL.x} y1={vL.y} x2={midFR.x} y2={midFR.y} stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3.5 3" />
              <line x1={vR.x} y1={vR.y} x2={midLF.x} y2={midLF.y} stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3.5 3" />
              <line x1={apex.x} y1={apex.y} x2={cent.x} y2={cent.y} stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3.5 3" />
            </>
          )}
          <polyline points={`${vL.x},${vL.y} ${vF.x},${vF.y} ${vR.x},${vR.y}`} fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vL.x} y2={vL.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vF.x} y2={vF.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vR.x} y2={vR.y} stroke="#0f172a" strokeWidth="1.5" />
          {[apex, vL, vF, vR].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2.4" fill="#0f172a" />
          ))}
          {activeMid && lbl.mid && (
            <g>
              <circle cx={activeMid.x} cy={activeMid.y} r="2.6" fill="#0284c7" />
              <text
                x={activeMid.x + (midEdge === 1 ? 8 : midEdge === 2 ? -10 : 0)}
                y={activeMid.y + (midEdge === 3 ? -6 : 13)}
                textAnchor="middle"
                fontSize="10.5"
                fontStyle="italic"
                fontWeight="600"
                fill="#0284c7"
              >
                {lbl.mid}
              </text>
            </g>
          )}
          {showMedians && (
            <>
              <circle cx={midFR.x} cy={midFR.y} r="2.4" fill="#0284c7" />
              <circle cx={midLF.x} cy={midLF.y} r="2.4" fill="#0284c7" />
              <text x={midFR.x + 8} y={midFR.y + 12} fontSize="10.5" fontStyle="italic" fill="#0284c7">{lbl.m1 || 'E'}</text>
              <text x={midLF.x - 10} y={midLF.y + 12} fontSize="10.5" fontStyle="italic" fill="#0284c7">{lbl.m2 || 'Q'}</text>
            </>
          )}
          {(showCentroid || showMedians) && (
            <g>
              <circle cx={cent.x} cy={cent.y} r="2.6" fill="#dc2626" />
              <text x={cent.x + 6} y={cent.y - 4} fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#dc2626">
                {lbl.cent || 'G'}
              </text>
            </g>
          )}
          <text x={apex.x} y={apex.y - 7} textAnchor="middle" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.apex || 'S'}</text>
          <text x={vL.x - 9} y={vL.y + 4} textAnchor="end" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vL || 'A'}</text>
          <text x={vF.x} y={vF.y + 14} textAnchor="middle" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vF || 'C'}</text>
          <text x={vR.x + 9} y={vR.y + 4} textAnchor="start" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vR || 'D'}</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b10_para_pyramid_3d') {
    const lbl = diagram.labels || {};
    const w = compact ? 245 : 275;
    const h = compact ? 176 : 196;
    const vBL = { x: 64, y: h - 74 };
    const vBR = { x: w - 38, y: h - 74 };
    const vFR = { x: w - 74, y: h - 22 };
    const vFL = { x: 28, y: h - 22 };
    const apex = { x: 96, y: 24 };
    const center = { x: (vBL.x + vFR.x) / 2, y: (vBL.y + vFR.y) / 2 };
    const showDiags = (params.showDiags ?? 0) === 1;
    const showSecant = (params.showSecant ?? 0) === 1;
    const tE = params.tE ?? 0.5;
    const E = { x: apex.x + (vBR.x - apex.x) * tE, y: apex.y + (vBR.y - apex.y) * tE };
    const H = { x: (vBL.x + vFL.x) / 2, y: (vBL.y + vFL.y) / 2 };

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={apex.x} y1={apex.y} x2={vBL.x} y2={vBL.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1={vBL.x} y1={vBL.y} x2={vBR.x} y2={vBR.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1={vBL.x} y1={vBL.y} x2={vFL.x} y2={vFL.y} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          {showDiags && (
            <>
              <line x1={vBL.x} y1={vBL.y} x2={vFR.x} y2={vFR.y} stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3.5 3" />
              <line x1={vBR.x} y1={vBR.y} x2={vFL.x} y2={vFL.y} stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3.5 3" />
              <line x1={apex.x} y1={apex.y} x2={center.x} y2={center.y} stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={center.x} cy={center.y} r="2.5" fill="#0284c7" />
              {lbl.center && (
                <text x={center.x} y={center.y - 6} textAnchor="middle" fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#0284c7">
                  {lbl.center}
                </text>
              )}
            </>
          )}
          {showSecant && (
            <>
              <line x1={vFR.x} y1={vFR.y} x2={E.x} y2={E.y} stroke="#0284c7" strokeWidth="1.35" />
              <line x1={vFR.x} y1={vFR.y} x2={H.x} y2={H.y} stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3.5 3" />
              <line x1={E.x} y1={E.y} x2={H.x} y2={H.y} stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3.5 3" />
              <circle cx={E.x} cy={E.y} r="2.6" fill="#0284c7" />
              <circle cx={H.x} cy={H.y} r="2.6" fill="#dc2626" />
              <text x={E.x + 8} y={E.y - 3} fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#0284c7">{lbl.ptE || 'E'}</text>
              <text x={H.x - 10} y={H.y - 2} textAnchor="end" fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#dc2626">{lbl.ptH || 'H'}</text>
            </>
          )}
          <polyline points={`${vFL.x},${vFL.y} ${vFR.x},${vFR.y} ${vBR.x},${vBR.y}`} fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vFL.x} y2={vFL.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vFR.x} y2={vFR.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vBR.x} y2={vBR.y} stroke="#0f172a" strokeWidth="1.5" />
          {[apex, vBL, vBR, vFR, vFL].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2.3" fill="#0f172a" />
          ))}
          <text x={apex.x} y={apex.y - 7} textAnchor="middle" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.apex || 'S'}</text>
          <text x={vBL.x - 9} y={vBL.y - 3} textAnchor="end" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vBL || 'A'}</text>
          <text x={vBR.x + 8} y={vBR.y + 4} textAnchor="start" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vBR || 'B'}</text>
          <text x={vFR.x + 6} y={vFR.y + 13} textAnchor="start" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vFR || 'C'}</text>
          <text x={vFL.x - 7} y={vFL.y + 11} textAnchor="end" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vFL || 'D'}</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b10_quad_pyramid_3d') {
    const lbl = diagram.labels || {};
    const w = compact ? 245 : 275;
    const h = compact ? 176 : 196;
    const isTrap = (params.isTrapezoid ?? 0) === 1;
    const vBL = isTrap ? { x: 28, y: h - 72 } : { x: 40, y: h - 68 };
    const vBR = isTrap ? { x: w - 28, y: h - 72 } : { x: w - 42, y: h - 68 };
    const vFL = isTrap ? { x: 80, y: h - 20 } : { x: 86, y: h - 18 };
    const vFR = isTrap ? { x: w - 80, y: h - 20 } : { x: w - 68, y: h - 30 };
    const apex = isTrap ? { x: 102, y: 22 } : { x: 144, y: 22 };
    const showDiags = (params.showDiags ?? 0) === 1;
    // Intersection of vBL--vFR and vBR--vFL
    const a1 = vFR.y - vBL.y, b1 = vBL.x - vFR.x, c1 = a1 * vBL.x + b1 * vBL.y;
    const a2 = vFL.y - vBR.y, b2 = vBR.x - vFL.x, c2 = a2 * vBR.x + b2 * vBR.y;
    const det = a1 * b2 - a2 * b1;
    const center = det !== 0
      ? { x: (b2 * c1 - b1 * c2) / det, y: (a1 * c2 - a2 * c1) / det }
      : { x: (vBL.x + vFR.x) / 2, y: (vBL.y + vFR.y) / 2 };

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <line x1={vBL.x} y1={vBL.y} x2={vBR.x} y2={vBR.y} stroke="#64748b" strokeWidth="1.25" strokeDasharray="4 3" />
          {showDiags && (
            <>
              <line x1={vBL.x} y1={vBL.y} x2={vFR.x} y2={vFR.y} stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3.5 3" />
              <line x1={vBR.x} y1={vBR.y} x2={vFL.x} y2={vFL.y} stroke="#0284c7" strokeWidth="1.1" strokeDasharray="3.5 3" />
              <line x1={apex.x} y1={apex.y} x2={center.x} y2={center.y} stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={center.x} cy={center.y} r="2.5" fill="#0284c7" />
              {lbl.center && (
                <text x={center.x + 11} y={center.y + 3} fontSize="10.5" fontStyle="italic" fontWeight="600" fill="#0284c7">
                  {lbl.center}
                </text>
              )}
            </>
          )}
          <polyline points={`${vBL.x},${vBL.y} ${vFL.x},${vFL.y} ${vFR.x},${vFR.y} ${vBR.x},${vBR.y}`} fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vBL.x} y2={vBL.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vFL.x} y2={vFL.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vFR.x} y2={vFR.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={apex.x} y1={apex.y} x2={vBR.x} y2={vBR.y} stroke="#0f172a" strokeWidth="1.5" />
          {[apex, vBL, vBR, vFR, vFL].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r="2.3" fill="#0f172a" />
          ))}
          <text x={apex.x + 6} y={apex.y - 5} fontSize="11.5" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.apex || 'S'}</text>
          <text x={vBL.x - 8} y={vBL.y - 2} textAnchor="end" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vBL || 'A'}</text>
          <text x={vBR.x + 8} y={vBR.y + 4} textAnchor="start" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vBR || 'B'}</text>
          <text x={vFR.x + 8} y={vFR.y + 10} textAnchor="start" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vFR || 'C'}</text>
          <text x={vFL.x - 9} y={vFL.y + 9} textAnchor="end" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">{lbl.vFL || 'D'}</text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b13_prism_3d') {
    const lbl = diagram.labels || {};
    const w = compact ? 235 : 265;
    const h = compact ? 176 : 196;
    const vL = { x: 40, y: h - 42 };
    const vF = { x: 108, y: h - 18 };
    const vR = { x: w - 60, y: h - 42 };
    const dx = 26;
    const tL = { x: vL.x + dx, y: 30 };
    const tF = { x: vF.x + dx, y: 54 };
    const tR = { x: vR.x + dx, y: 30 };

    const renderVertexLbl = (pt: { x: number; y: number }, ox: number, oy: number, raw: string) => {
      const idx = raw.indexOf('_');
      const base = idx >= 0 ? raw.slice(0, idx) : raw;
      const sub = idx >= 0 ? raw.slice(idx + 1) : '';
      return (
        <text x={pt.x + ox} y={pt.y + oy} textAnchor="middle" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">
          {base}
          {sub ? <tspan dy="2.5" fontSize="7.5" fontStyle="normal">{sub}</tspan> : null}
        </text>
      );
    };

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={`${tL.x},${tL.y} ${tF.x},${tF.y} ${tR.x},${tR.y}`} fill="#e0f2fe" fillOpacity="0.28" stroke="none" />
          <line x1={vL.x} y1={vL.y} x2={vR.x} y2={vR.y} stroke="#64748b" strokeWidth="1.25" strokeDasharray="4 3" />
          <polyline points={`${vL.x},${vL.y} ${vF.x},${vF.y} ${vR.x},${vR.y}`} fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <polygon points={`${tL.x},${tL.y} ${tF.x},${tF.y} ${tR.x},${tR.y}`} fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <line x1={vL.x} y1={vL.y} x2={tL.x} y2={tL.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={vF.x} y1={vF.y} x2={tF.x} y2={tF.y} stroke="#0f172a" strokeWidth="1.5" />
          <line x1={vR.x} y1={vR.y} x2={tR.x} y2={tR.y} stroke="#0f172a" strokeWidth="1.5" />
          {[vL, vF, vR, tL, tF, tR].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2.2" fill="#0f172a" />
          ))}
          {renderVertexLbl(vL, -11, 3, lbl.vL || 'A')}
          {renderVertexLbl(vF, 0, 14, lbl.vF || 'B')}
          {renderVertexLbl(vR, 12, 4, lbl.vR || 'C')}
          {renderVertexLbl(tL, -11, -5, lbl.tL || 'A_1')}
          {renderVertexLbl(tF, -10, -7, lbl.tF || 'B_1')}
          {renderVertexLbl(tR, 12, -5, lbl.tR || 'C_1')}
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b15_nested_squares') {
    const t = 1 / Math.max(2, params.ratioDen ?? 2);
    const size = compact ? 176 : 204;
    const pad = 18;
    let pts: Array<{ x: number; y: number }> = [
      { x: pad, y: pad },
      { x: size - pad, y: pad },
      { x: size - pad, y: size - pad },
      { x: pad, y: size - pad },
    ];
    const polys: Array<{ points: string; idx: number }> = [];
    for (let level = 0; level < 9; level++) {
      polys.push({ points: pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '), idx: level });
      pts = pts.map((p, i) => {
        const nxt = pts[(i + 1) % 4];
        return { x: p.x + t * (nxt.x - p.x), y: p.y + t * (nxt.y - p.y) };
      });
    }
    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="bg-white border border-slate-200 rounded select-none">
          {polys.map((poly) => (
            <polygon
              key={poly.idx}
              points={poly.points}
              fill={poly.idx % 2 === 0 ? '#e0f2fe' : '#ffffff'}
              fillOpacity={poly.idx === 0 ? 0.3 : 0.45}
              stroke={poly.idx === 0 ? '#0f172a' : '#0284c7'}
              strokeWidth={poly.idx === 0 ? 1.5 : Math.max(0.75, 1.3 - poly.idx * 0.08)}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b15_nested_triangles') {
    const w = compact ? 210 : 240;
    const h = compact ? 178 : 198;
    const A = { x: w / 2, y: 22 };
    const B = { x: 28, y: h - 24 };
    const C = { x: w - 28, y: h - 24 };
    const mid = (p: { x: number; y: number }, q: { x: number; y: number }) => ({
      x: (p.x + q.x) / 2,
      y: (p.y + q.y) / 2,
    });
    const A1 = mid(B, C), B1 = mid(C, A), C1 = mid(A, B);
    const A2 = mid(B1, C1), B2 = mid(C1, A1), C2 = mid(A1, B1);
    const A3 = mid(B2, C2), B3 = mid(C2, A2), C3 = mid(A2, B2);

    const triPts = (p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }) =>
      `${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}`;

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <polygon points={triPts(A, B, C)} fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
          <polygon points={triPts(A1, B1, C1)} fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.25" />
          <polygon points={triPts(A2, B2, C2)} fill="#bae6fd" stroke="#0284c7" strokeWidth="1.15" />
          <polygon points={triPts(A3, B3, C3)} fill="#7dd3fc" stroke="#0369a1" strokeWidth="1" />
          <text x={A.x} y={A.y - 6} textAnchor="middle" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">A</text>
          <text x={B.x - 10} y={B.y + 4} textAnchor="end" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">B</text>
          <text x={C.x + 10} y={C.y + 4} textAnchor="start" fontSize="11" fontStyle="italic" fontWeight="600" fill="#0f172a">C</text>
          <text x={A1.x} y={A1.y + 13} textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#0369a1">A<tspan dy="2" fontSize="7">1</tspan></text>
          <text x={B1.x + 10} y={B1.y + 2} textAnchor="start" fontSize="9.5" fontStyle="italic" fill="#0369a1">B<tspan dy="2" fontSize="7">1</tspan></text>
          <text x={C1.x - 10} y={C1.y + 2} textAnchor="end" fontSize="9.5" fontStyle="italic" fill="#0369a1">C<tspan dy="2" fontSize="7">1</tspan></text>
          <text x={A2.x} y={A2.y - 4} textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#0f172a">A<tspan dy="2" fontSize="6.5">2</tspan></text>
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b15_nested_circles') {
    const w = compact ? 290 : 330;
    const h = compact ? 124 : 138;
    const R = compact ? 36 : 42;
    const cy = h / 2 - 8;
    const centers = [w * 0.18, w * 0.5, w * 0.82];
    const tags = ['a)', 'b)', 'c)'];

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          {centers.map((cx, stage) => (
            <g key={stage}>
              <circle cx={cx} cy={cy} r={R} fill="#bae6fd" fillOpacity="0.6" stroke="#0f172a" strokeWidth="1.35" />
              {stage >= 1 && (
                <>
                  <circle cx={cx - R / 2} cy={cy} r={R / 2} fill="#fef08a" fillOpacity="0.75" stroke="#0f172a" strokeWidth="1.1" />
                  <circle cx={cx + R / 2} cy={cy} r={R / 2} fill="#fef08a" fillOpacity="0.75" stroke="#0f172a" strokeWidth="1.1" />
                </>
              )}
              {stage >= 2 &&
                [-0.75, -0.25, 0.25, 0.75].map((off, idx) => (
                  <circle
                    key={idx}
                    cx={cx + off * R}
                    cy={cy}
                    r={R / 4}
                    fill="#bbf7d0"
                    fillOpacity="0.85"
                    stroke="#0f172a"
                    strokeWidth="0.95"
                  />
                ))}
              <text x={cx} y={cy + R + 17} textAnchor="middle" fontSize="11" fill="#334155">
                {tags[stage]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (figureType === 'l11_b20_exp_log_plot') {
    const lbl = diagram.labels || {};
    const fnType = params.fnType ?? 0; // 0: b^x, 1: (1/b)^x, 2: (sqrt(p))^x, 3: log_b(x), 4: log_{1/b}(x)
    const rawBase = Math.max(2, params.base ?? 2);
    const isExp = fnType <= 2;
    const realBase =
      fnType === 0
        ? rawBase
        : fnType === 1
        ? 1 / rawBase
        : fnType === 2
        ? Math.sqrt(rawBase)
        : fnType === 3
        ? rawBase
        : 1 / rawBase;

    const ptX = fnType <= 2 ? 1 : fnType === 3 ? rawBase : 1 / rawBase;
    const ptY = fnType <= 2 ? realBase : 1;

    const xMin = isExp ? -2.2 : -0.7;
    const xMax = isExp ? 2.1 : fnType === 3 ? Math.max(3.6, rawBase + 1.2) : 2.8;
    const yMin = isExp ? -0.7 : -1.8;
    const yMax = isExp ? Math.max(3.6, ptY + 1.1) : 2.2;

    const w = compact ? 250 : 290;
    const h = compact ? 198 : 228;
    const pad = 22;
    const plotW = w - pad * 2;
    const plotH = h - pad * 2;
    const mapX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * plotW;
    const mapY = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * plotH;

    const steps = 180;
    const startX = isExp ? xMin : 0.008;
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const x = startX + ((xMax - startX) * i) / steps;
      const y = isExp ? Math.pow(realBase, x) : Math.log(x) / Math.log(realBase);
      if (!Number.isFinite(y) || y < yMin - 1.5 || y > yMax + 1.5) {
        continue;
      }
      const px = mapX(x).toFixed(2);
      const py = mapY(y).toFixed(2);
      d += d ? ` L ${px} ${py}` : `M ${px} ${py}`;
    }

    const ox = mapX(0);
    const oy = mapY(0);
    const clipId = `b20-clip-${fnType}-${rawBase}`;

    const renderCoordLabel = (x: number, y: number, text: string, anchor: 'end' | 'middle' | 'start') => {
      if (text.includes('/')) {
        const [num, den] = text.split('/');
        return (
          <g>
            <text x={x} y={y - 3} textAnchor={anchor} fontSize="8.5" fill="#0f172a">{num}</text>
            <line x1={x - 5} y1={y - 1} x2={x + 5} y2={y - 1} stroke="#0f172a" strokeWidth="0.7" />
            <text x={x} y={y + 7.5} textAnchor={anchor} fontSize="8.5" fill="#0f172a">{den}</text>
          </g>
        );
      }
      return (
        <text x={x} y={y} textAnchor={anchor} fontSize="9.5" fill="#0f172a">
          {text}
        </text>
      );
    };

    const ptPxX = mapX(ptX);
    const ptPxY = mapY(ptY);
    const xLabel = lbl.xLabel || (fnType <= 2 ? '1' : fnType === 3 ? String(rawBase) : `1/${rawBase}`);
    const yLabel = lbl.yLabel || (fnType === 0 ? String(rawBase) : fnType === 1 ? `1/${rawBase}` : fnType === 2 ? `√${rawBase}` : '1');

    return (
      <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
          <defs>
            <clipPath id={clipId}>
              <rect x={pad} y={pad} width={plotW} height={plotH} />
            </clipPath>
            <marker id={`${clipId}-arr`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
            </marker>
          </defs>

          {/* Axes */}
          <line x1={pad} y1={oy} x2={w - pad + 8} y2={oy} stroke="#334155" strokeWidth="1.2" markerEnd={`url(#${clipId}-arr)`} />
          <line x1={ox} y1={h - pad} x2={ox} y2={pad - 8} stroke="#334155" strokeWidth="1.2" markerEnd={`url(#${clipId}-arr)`} />
          <text x={w - pad + 4} y={oy + 12} fontSize="10.5" fontStyle="italic" fill="#0f172a">x</text>
          <text x={ox - 12} y={pad - 2} fontSize="10.5" fontStyle="italic" fill="#0f172a">y</text>
          <text x={ox - 10} y={oy + 12} fontSize="9.5" fontStyle="italic" fill="#334155">O</text>

          {/* Unit intercept (0,1) for exp or (1,0) for log */}
          {isExp ? (
            <>
              <circle cx={ox} cy={mapY(1)} r="1.8" fill="#334155" />
              <text x={ox + (fnType === 1 ? 7 : -8)} y={mapY(1) + (fnType === 1 ? 3 : -4)} textAnchor={fnType === 1 ? 'start' : 'end'} fontSize="9.5" fill="#0f172a">1</text>
            </>
          ) : (
            <>
              <circle cx={mapX(1)} cy={oy} r="1.8" fill="#334155" />
              <text x={mapX(1)} y={oy + 12} textAnchor="middle" fontSize="9.5" fill="#0f172a">1</text>
            </>
          )}

          {/* Curve clipped */}
          <g clipPath={`url(#${clipId})`}>
            {d && <path d={d} fill="none" stroke="#0284c7" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />}
          </g>

          {/* Dashed reference lines + highlighted point */}
          <line x1={ox} y1={ptPxY} x2={ptPxX} y2={ptPxY} stroke="#64748b" strokeWidth="1" strokeDasharray="3.5 2.5" />
          <line x1={ptPxX} y1={ptPxY} x2={ptPxX} y2={oy} stroke="#64748b" strokeWidth="1" strokeDasharray="3.5 2.5" />
          <circle cx={ptPxX} cy={ptPxY} r="2.7" fill="#0f172a" />

          {/* Point axis labels */}
          {renderCoordLabel(ptPxX, oy + (fnType === 4 ? 15 : 12), xLabel, 'middle')}
          {renderCoordLabel(ox - (yLabel.includes('/') ? 11 : 7), ptPxY + 3, yLabel, yLabel.includes('/') ? 'middle' : 'end')}
        </svg>
      </div>
    );
  }

  // river_bridge
  const w = compact ? 290 : 340;
  const h = compact ? 155 : 175;
  return (
    <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
        <rect x="115" y="12" width="110" height={h - 24} fill="#e0f2fe" fillOpacity="0.65" />
        <line x1="115" y1="12" x2="115" y2={h - 12} stroke="#0f172a" strokeWidth="1.5" />
        <line x1="225" y1="12" x2="225" y2={h - 12} stroke="#0f172a" strokeWidth="1.5" />
        {/* A=(46,42), H=(115,42), E=(115,90), F=(225,90), K=(225,134), B=(298,134) */}
        <line x1="46" y1="42" x2="115" y2="42" stroke="#334155" strokeWidth="1.2" />
        <line x1="225" y1="134" x2="298" y2="134" stroke="#334155" strokeWidth="1.2" />
        <polyline points="107,42 107,50 115,50" fill="none" stroke="#475569" strokeWidth="1" />
        <polyline points="225,126 233,126 233,134" fill="none" stroke="#475569" strokeWidth="1" />
        <line x1="46" y1="42" x2="115" y2="90" stroke="#0284c7" strokeWidth="1.6" />
        <line x1="115" y1="90" x2="225" y2="90" stroke="#0f172a" strokeWidth="2.4" />
        <line x1="225" y1="90" x2="298" y2="134" stroke="#0284c7" strokeWidth="1.6" />
        {[
          { x: 46, y: 42 },
          { x: 115, y: 42 },
          { x: 115, y: 90 },
          { x: 225, y: 90 },
          { x: 225, y: 134 },
          { x: 298, y: 134 },
        ].map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="2.5" fill="#0f172a" />
        ))}
        <text x="38" y="45" textAnchor="end" fontSize="11" fontStyle="italic" fill="#0f172a">A</text>
        <text x="122" y="38" fontSize="11" fontStyle="italic" fill="#0f172a">H</text>
        <text x="108" y="102" textAnchor="end" fontSize="11" fontStyle="italic" fill="#0f172a">E</text>
        <text x="232" y="86" fontSize="11" fontStyle="italic" fill="#0f172a">F</text>
        <text x="218" y="146" textAnchor="end" fontSize="11" fontStyle="italic" fill="#0f172a">K</text>
        <text x="305" y="137" fontSize="11" fontStyle="italic" fill="#0f172a">B</text>
        <text x="80" y="35" textAnchor="middle" fontSize="9.5" fill="#334155">{params.h1} km</text>
        <text x="262" y="148" textAnchor="middle" fontSize="9.5" fill="#334155">{params.h2} km</text>
      </svg>
    </div>
  );
};

const FrequencyTableView: React.FC<{ diagram: Extract<QuestionDiagramSpec, { kind: 'frequency_table' }>; compact?: boolean }> = ({
  diagram,
  compact,
}) => {
  return (
    <div className={`my-2 flex justify-center overflow-x-auto ${compact ? 'text-[11px]' : 'text-xs'}`}>
      <table className="border-collapse border border-slate-300 bg-white text-slate-900">
        <tbody>
          <tr className="bg-slate-50">
            <th className="border border-slate-300 px-2.5 py-1.5 font-semibold text-left whitespace-nowrap">
              <MathText text={diagram.row1Label} />
            </th>
            {diagram.intervals.map((iv, idx) => (
              <td key={idx} className="border border-slate-300 px-2.5 py-1.5 text-center font-medium whitespace-nowrap tabular-nums">
                <MathText text={iv} />
              </td>
            ))}
          </tr>
          <tr>
            <th className="border border-slate-300 px-2.5 py-1.5 font-semibold text-left bg-slate-50 whitespace-nowrap">
              <MathText text={diagram.row2Label} />
            </th>
            {diagram.frequencies.map((freq, idx) => (
              <td key={idx} className="border border-slate-300 px-2.5 py-1.5 text-center tabular-nums">
                <MathText text={String(freq)} />
              </td>
            ))}
          </tr>
          {(diagram.extraRows || []).map((row, rIdx) => (
            <tr key={rIdx}>
              <th className="border border-slate-300 px-2.5 py-1.5 font-semibold text-left bg-slate-50 whitespace-nowrap">
                <MathText text={row.label} />
              </th>
              {row.values.map((val, cIdx) => (
                <td key={cIdx} className="border border-slate-300 px-2.5 py-1.5 text-center tabular-nums">
                  <MathText text={String(val)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProbTreeView: React.FC<{ diagram: ProbTreeDiagram; compact?: boolean }> = ({
  diagram,
  compact,
}) => {
  const w = compact ? 310 : 350;
  const h = compact ? 185 : 210;
  const sx = w / 350;
  const sy = h / 210;
  const X0 = 26 * sx;
  const Y0 = 105 * sy;
  const X1 = 135 * sx;
  const X1R = 178 * sx;
  const Y1Top = 50 * sy;
  const Y1Bot = 160 * sy;
  const X2 = 278 * sx;
  const boxW = 43 * sx;
  const boxH = 26 * sy;
  const y2 = [24 * sy, 76 * sy, 134 * sy, 186 * sy];

  const renderEventLabel = (cx: number, cy: number, sym: string, neg: boolean) => (
    <g>
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={compact ? 11 : 12.5}
        fontStyle="italic"
        fontWeight="600"
        fill="#0f172a"
      >
        {sym}
      </text>
      {neg && (
        <line
          x1={cx - 6}
          y1={cy - 7}
          x2={cx + 6}
          y2={cy - 7}
          stroke="#0f172a"
          strokeWidth="1.2"
        />
      )}
    </g>
  );

  const renderBranchLabel = (
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number,
    label?: string,
    above = true
  ) => {
    if (!label) return null;
    const mx = (xStart + xEnd) / 2;
    const my = (yStart + yEnd) / 2;
    const angle = (Math.atan2(yEnd - yStart, xEnd - xStart) * 180) / Math.PI;
    const dy = above ? -5 : 13;
    return (
      <text
        x={mx}
        y={my}
        dy={dy}
        textAnchor="middle"
        transform={`rotate(${angle.toFixed(1)} ${mx} ${my})`}
        fontSize={compact ? 10 : 11}
        fontWeight="500"
        fill="#1e293b"
      >
        {label}
      </text>
    );
  };

  return (
    <div className={`flex justify-center ${compact ? 'my-2' : 'my-3'}`}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="bg-white border border-slate-200 rounded select-none">
        <defs>
          <marker id="ptArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M 0 0.8 L 6.5 3.5 L 0 6.2 z" fill="#334155" />
          </marker>
        </defs>
        {/* Stage 1 arrows */}
        <line x1={X0} y1={Y0} x2={X1} y2={Y1Top} stroke="#334155" strokeWidth="1.35" markerEnd="url(#ptArrow)" />
        <line x1={X0} y1={Y0} x2={X1} y2={Y1Bot} stroke="#334155" strokeWidth="1.35" markerEnd="url(#ptArrow)" />
        {renderBranchLabel(X0, Y0, X1, Y1Top, diagram.p1, true)}
        {renderBranchLabel(X0, Y0, X1, Y1Bot, diagram.p1Comp, false)}

        {/* Stage 1 boxes */}
        <rect x={X1} y={Y1Top - boxH / 2} width={boxW} height={boxH} rx="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
        {renderEventLabel(X1 + boxW / 2, Y1Top, diagram.event1, false)}
        <rect x={X1} y={Y1Bot - boxH / 2} width={boxW} height={boxH} rx="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
        {renderEventLabel(X1 + boxW / 2, Y1Bot, diagram.event1, true)}

        {/* Stage 2 arrows */}
        <line x1={X1R} y1={Y1Top} x2={X2} y2={y2[0]} stroke="#334155" strokeWidth="1.35" markerEnd="url(#ptArrow)" />
        <line x1={X1R} y1={Y1Top} x2={X2} y2={y2[1]} stroke="#334155" strokeWidth="1.35" markerEnd="url(#ptArrow)" />
        <line x1={X1R} y1={Y1Bot} x2={X2} y2={y2[2]} stroke="#334155" strokeWidth="1.35" markerEnd="url(#ptArrow)" />
        <line x1={X1R} y1={Y1Bot} x2={X2} y2={y2[3]} stroke="#334155" strokeWidth="1.35" markerEnd="url(#ptArrow)" />

        {renderBranchLabel(X1R, Y1Top, X2, y2[0], diagram.p2Given1, true)}
        {renderBranchLabel(X1R, Y1Top, X2, y2[1], diagram.p2CompGiven1, false)}
        {renderBranchLabel(X1R, Y1Bot, X2, y2[2], diagram.p2Given1Comp, true)}
        {renderBranchLabel(X1R, Y1Bot, X2, y2[3], diagram.p2CompGiven1Comp, false)}

        {/* Stage 2 boxes */}
        {[false, true, false, true].map((neg, idx) => (
          <g key={idx}>
            <rect x={X2} y={y2[idx] - boxH / 2} width={boxW} height={boxH} rx="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
            {renderEventLabel(X2 + boxW / 2, y2[idx], diagram.event2, neg)}
          </g>
        ))}
      </svg>
    </div>
  );
};

export const QuestionDiagram: React.FC<QuestionDiagramProps> = ({ diagram, compact }) => {
  if (!diagram) return null;
  if (diagram.kind === 'variation_table') {
    return <VariationTableView diagram={diagram} compact={compact} />;
  }
  if (diagram.kind === 'geometry_figure') {
    return <GeometryFigureView diagram={diagram} compact={compact} />;
  }
  if (diagram.kind === 'frequency_table') {
    return <FrequencyTableView diagram={diagram} compact={compact} />;
  }
  if (diagram.kind === 'prob_tree') {
    return <ProbTreeView diagram={diagram} compact={compact} />;
  }
  return <FunctionPlotView diagram={diagram} compact={compact} />;
};
