import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Circle, Line, G } from 'react-native-svg';

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
  const radius = size / 2.5;
  const levels = 5;
  const angles = [270, 342, 54, 126, 198]; // en grados para cada eje

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

          {/* Líneas desde el centro */}
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

          {/* Área de estadísticas */}
          <Polygon
            points={getStatsPoints()}
            fill="rgba(255, 165, 0, 0.4)"
            stroke="#FF9809"
            strokeWidth={3}
          />

          {/* Puntos */}
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
