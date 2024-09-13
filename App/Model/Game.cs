namespace GeoInvader.Model
{
    public class Game
    {
        private List<Form> forms = new List<Form>();

        public double TotalArea => forms.Sum(form => form.GetArea());

        public double TotalPerimeter => forms.Sum(form => form.GetPerimeter());

        public void AddForm(Form form)
        {
            forms.Add(form);
        }

        public IEnumerable<Form> GetForms()
        {
            return forms;
        }
    }
}