import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon, Circle, Line, G, Text, Rect } from 'react-native-svg';

interface Skills {
  fisico: number;
  tecnica: number;
  fuerzaMental: number;
  resistencia: number;
  habilidadEspecial: number;
}

interface Props {
  skills: Skills;
}

const PentagonChart: React.FC<Props> = ({ skills }) => {
  const size = 300;
  const center = size / 2;
  const radius = size / 3.1;
  const levels = 5;
  const angles = [270, 342, 54, 126, 198];

  const getPoint = (angle: number, level: number) => {
    const rad = (angle * Math.PI) / 180;
    const r = (radius / levels) * level;
    const x = center + r * Math.cos(rad);
    const y = center + r * Math.sin(rad);
    return `${x},${y}`;
  };

  const getStatsPoints = () => {
    const values = [
      skills.fisico,
      skills.tecnica,
      skills.fuerzaMental,
      skills.resistencia,
      skills.habilidadEspecial,
    ];
    return values
      .map((value, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const r = (radius * value) / 10;
        const x = center + r * Math.cos(rad);
        const y = center + r * Math.sin(rad);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const skillNames = [
    'Físico',
    'Técnica',
    'Fuerza mental',
    'Resistencia',
    'Habilidades especiales',
  ];

  const values = [
    skills.fisico,
    skills.tecnica,
    skills.fuerzaMental,
    skills.resistencia,
    skills.habilidadEspecial,
  ];

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G>
          {[...Array(levels)].map((_, i) => (
            <Polygon
              key={i}
              points={angles.map((angle) => getPoint(angle, i + 1)).join(' ')}
              stroke="#D38A03"
              strokeWidth={1}
              fill="none"
            />
          ))}

          {angles.map((angle, i) => {
            const [x, y] = getPoint(angle, levels).split(',');
            return (
              <Line
                key={`line-${i}`}
                x1={center}
                y1={center}
                x2={parseFloat(x)}
                y2={parseFloat(y)}
                stroke="#D38A03"
              />
            );
          })}

          <Polygon
            points={getStatsPoints()}
            fill="rgba(255, 165, 0, 0.4)"
            stroke="#FF9809"
            strokeWidth={3}
          />

          {getStatsPoints()
            .split(' ')
            .map((point, i) => {
              const [x, y] = point.split(',');
              return (
                <Circle
                  key={`point-${i}`}
                  cx={x}
                  cy={y}
                  r={4}
                  fill="orange"
                />
              );
            })}

          {angles.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const labelRadius = radius + 28;
            const x = center + labelRadius * Math.cos(rad);
            const y = center + labelRadius * Math.sin(rad);

            const labelWidth = 62;
            const labelHeight = 28;
            const valueHeight = 25;

            const splitName = skillNames[i].split(' ');

            return (
              <G key={`label-${i}`}>
                {/* Fondo negro para el nombre */}
                <Rect
                  x={x - labelWidth / 2}
                  y={y - (labelHeight + valueHeight) / 2}
                  width={labelWidth}
                  height={labelHeight}
                  fill="black"
                />

                {splitName.length > 1 ? (
                  <>
                    <Text
                      x={x}
                      y={y - valueHeight / 2 - 5}
                      fontSize="11"
                      fill="white"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="Arial"
                    >
                      {splitName[0]}
                    </Text>
                    <Text
                      x={x}
                      y={y - valueHeight / 2 + 7}
                      fontSize="11"
                      fill="white"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="Arial"
                    >
                      {splitName[1]}
                    </Text>
                  </>
                ) : (
                  <Text
                    x={x}
                    y={y - valueHeight / 2}
                    fontSize="11"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="Arial"
                  >
                    {skillNames[i]}
                  </Text>
                )}

                {/* Fondo blanco para el valor */}
                <Rect
                  x={x - labelWidth / 2}
                  y={y + 2}
                  width={labelWidth}
                  height={valueHeight}
                  fill="white"
                  stroke="black"
                />
                <Text
                  x={x}
                  y={y + valueHeight - 2}
                  fontSize="11"
                  fontFamily="Arial"
                  fontWeight="bold"
                  fill="black"
                  textAnchor="middle"
                >
                  {values[i]}
                </Text>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PentagonChart;
