import { Card, Typography, List } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function AboutSection() {
  const features = [
    '实用网站导航：汇集了Minecraft相关的官方网站、社区、模组平台等资源',
    '启动器下载：提供各种Minecraft启动器的下载链接，支持代理下载功能',
    '便捷访问：一键直达各类Minecraft资源网站',
    '持续更新：定期更新网站内容和资源链接'
  ]

  const techFeatures = [
    '前端框架：使用React + Next.js构建，提供优秀的用户体验',
    'UI组件：采用Ant Design组件库，界面美观大方',
    '数据接口：通过JSON接口获取数据，便于维护和扩展',
    '代理支持：支持GitHub资源代理下载，解决访问问题'
  ]

  const contactInfo = [
    '邮箱：contact@mc-nav.com',
    'GitHub：github.com/mc-nav'
  ]

  return (
    <div className="py-8">
      <Title level={2} className="mb-6">关于我们</Title>
      <Card>
        <Title level={3}>Minecraft导航网站</Title>
        <Paragraph>
          这是一个专门为Minecraft玩家设计的导航网站，旨在为玩家提供最全面、最实用的Minecraft资源导航服务。
        </Paragraph>
        
        <Title level={4}>主要功能</Title>
        <List
          size="small"
          dataSource={features}
          renderItem={(item) => (
            <List.Item>
              <Text strong>{item.split('：')[0]}：</Text>
              {item.split('：')[1]}
            </List.Item>
          )}
        />
        
        <Title level={4} className="mt-6">技术特点</Title>
        <List
          size="small"
          dataSource={techFeatures}
          renderItem={(item) => (
            <List.Item>
              <Text strong>{item.split('：')[0]}：</Text>
              {item.split('：')[1]}
            </List.Item>
          )}
        />
        
        <Title level={4} className="mt-6">联系我们</Title>
        <Paragraph>
          如果您有任何建议或发现链接失效，欢迎通过以下方式联系我们：
        </Paragraph>
        <List
          size="small"
          dataSource={contactInfo}
          renderItem={(item) => (
            <List.Item>
              <Text>{item}</Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}