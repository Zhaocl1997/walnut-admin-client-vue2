<script>
export default {
  name: "wMenuItem",

  functional: true,

  props: {
    icon: { type: String, default: "" },
    title: { type: String, default: "" }
  },

  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<w-icon icon={icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }

    return vnodes;
  }
};
</script>