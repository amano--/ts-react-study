import { Story, Meta } from "@storybook/react"
import { SharedGreeter, SharedGreeterProps } from "./shared-greeter"

export default {
  component: SharedGreeter,
  title: "SharedGreeter",
} as Meta

const Template: Story<SharedGreeterProps> = (args) => (
  <SharedGreeter {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
