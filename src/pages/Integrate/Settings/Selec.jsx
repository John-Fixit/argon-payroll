
import { Select, Space } from 'antd';




const options = [
  {
    label: 'China',
    value: 'china',
    emoji: '🇨🇳',
    desc: 'China (中国)',
  },
  {
    label: 'USA',
    value: 'usa',
    emoji: '🇺🇸',
    desc: 'USA (美国)',
  },
  {
    label: 'Japan',
    value: 'japan',
    emoji: '🇯🇵',
    desc: 'Japan (日本)',
  },
  {
    label: 'Korea',
    value: 'korea',
    emoji: '🇰🇷',
    desc: 'Korea (韩国)',
  },
];





const Selec = () => {

const handleChange = (value) => {
  // console.log(`selected ${value}`);
}

        return (

            <Select
            mode="multiple"
            style={{
                width: '100%',
            }}
            placeholder="select one country"
            defaultValue={[]}
            onChange={handleChange}
            optionLabelProp="label"
            options={options}
            optionRender={(option) => (
                <Space>
                <span role="img" aria-label={option.data.label}>
                    {option.data.emoji}
                </span>
                {option.data.desc}
                </Space>
            )}
            />      
        )
    }
export default Selec;