export default async function ProductPage(props: PageProps<'/shop/[id]'>) {
  const { id } = await props.params;
  return (
    <main>
      <h1>Product {id}</h1>
    </main>
  );
}
