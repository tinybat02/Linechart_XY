import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Buffer } from 'types';
import { ResponsiveLine } from '@nivo/line';
import { processData } from './util/process';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  data: Array<{ id: string; data: Array<{ x: number; y: number }> }>;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    data: [],
  };

  componentDidMount() {
    if (this.props.data.series.length == 0) return;
    const buffer = this.props.data.series[0].fields[0].values as Buffer;

    if (buffer.length == 0) return;
    const data = processData(buffer);
    this.setState({ data });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.data.series !== prevProps.data.series) {
      if (this.props.data.series.length == 0) {
        this.setState({ data: [] });
        return;
      }

      const buffer = this.props.data.series[0].fields[0].values as Buffer;
      if (buffer.length == 0) {
        this.setState({ data: [] });
        return;
      }

      const data = processData(buffer);
      this.setState({ data });
    }
  }

  render() {
    const { data } = this.state;

    if (data.length == 0) return <div>No Data</div>;

    return (
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear' }}
        yFormat=" >-.3f"
        axisTop={null}
        axisRight={null}
        // axisBottom={{

        //   orient: 'bottom',
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   // legend: 'transportation',
        //   legendOffset: 36,
        //   legendPosition: 'middle',
        // }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  }
}
