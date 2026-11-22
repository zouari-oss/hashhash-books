# Odoo Notes

- Python doesn't require you to use the exact same parameter names, _but Odoo does use argument names in some parts of its framework logic_, especially with decorators and method calls via reflection. So mismatching names can cause issues.

```Python
# ✅ Correct Signature for create in Odoo
@api.model
def create(self, vals_list):
    ...
# ❌ Incorrect
@api.model
def create(self, vals):  # ❌ This causes a parameter name mismatch
    ...
```

## How to Use Logging in Odoo

1. First, import the logging module in python: ie, `import logging`
2. Next, create logger instance for the odoo class: ie, `_logger = logging.getLogger(__name__)`
3. Then use `_logger.info()`,`_logger.warning()` or `_logger.error()` to log the messages.

- Also possible to add logging settings in the _Odoo configuration file_ (odoo.conf):

```conf
; Set the log level (debug, info, warning, error, or critical).
log_level = LEVEL
; Set the path of the log file.
logfile = /path/log/file.log
```

- In Python:

```Python
# First, import the logging module and initialize the logger to a variable.
import logging
_logger = logging.getLogger(__name__)

# Then, create any function to show the different log levels.
class ProductPriceList(models.Model):
  _inherit = "product.pricelist"
  @api.onchange('currency_id')
  def onchange_currency_id(self):
    """ Logging at different levels """
    _logger.debug("------------IT IS DEBUG-----------")
    _logger.info("-------------IT IS INFO------------")
    _logger.error("------------IT IS Error-----------")
    _logger.warning("----------IT IS warning---------")
    _logger.critical("----------IT IS Critical---------")
```

## Window Actions (`ir.actions.act_window`)

### 🧾 Basic Information

- Name: ir.actions.act_window
- Type: Odoo Server Action Model
- Role: Controls the opening of views (forms, lists, kanban, etc.) in Odoo
- Environment: Odoo Framework (Python + XML)
- Version Compatibility: Odoo 8.0 and later (Odoo 14+, 15+, 16+, etc.)

### 🧩 Objective

To provide a flexible and dynamic mechanism to open specific views (models) in the Odoo UI, supporting menu items, button actions, and automation workflows. I help developers control what users see and how they interact with records.

### 📚 Key Skills and Features

- Model Binding: Link to any model (`res_model`) in the system
- View Customization: Supports form, tree (list), kanban, calendar, pivot, graph, and search views
- View Modes: Define multiple view types using `view_mode` (form,tree, etc.. _default= list,form_)
- Domain Filters: Restrict visible records using dynamic or static domain expressions
- Context Passing: Pass custom context for default values or UI behavior
- Target Control: Define how the view opens (current, new, inline, modal)
- View Prioritization: Set default view via `view_id`, and priority order with `view_ids`
- Multi-View Support: Chain views using `view_ids` for smoother UI transitions
- Menu Integration: Seamlessly attach to menu items in `ir.ui.menu`

### 📄 Typical XML Definition

```XML
<record id="action_partner_form" model="ir.actions.act_window">
    <field name="name">Partners</field>
    <field name="res_model">res.partner</field>
    <field name="view_mode">tree,form</field>
    <field name="context">{}</field>
    <field name="domain">[]</field>
</record>
```

### 🛠️ Common Use Cases

- Navigation from Menus: Triggered by menu items to open a view
- Smart Buttons: Used in form views to navigate to related models
- Automated Actions: Called from Python code or server actions
- Wizards & Reports: Launch wizards with target="new" or target="modal"

### 🧠 Sample Python Usage

```Python
return {
    'type': 'ir.actions.act_window',
    'name': 'Contacts',
    'res_model': 'res.partner',
    'view_mode': 'tree,form',
    'domain': [('customer_rank', '>', 0)],
    'context': {'search_default_customer': 1},
    'target': 'current',
}
```

## `ir.ui.view` (Odoo View Definition Model)

### 🧾 Basic Information

- Name: ir.ui.view
- Type: Odoo ORM Model
- Role: Defines the structure, layout, and behavior of user interface views
- Environment: Odoo Framework (Python + XML)
- Version Compatibility: Odoo 8.0 and later (including 14, 15, 16, 17, etc.)

### 🧩 Objective

To provide a flexible and extensible system for creating and modifying views (form, tree, kanban, search, calendar, etc.) for any model in Odoo. I allow developers to define the UI presentation and user interaction in a structured XML format.

### 📚 Key Skills and Features

- Model Linking: Binds UI layout to models (model field)
- View Types: Supports form, tree, kanban, calendar, pivot, graph, activity, gantt, search, qweb
- XML Architecture: View content defined using XML with templating, inheritance, and conditional logic
- Inheritance: Enables extension and customization using `inherit_id` and XPath
- Priority Handling: Control rendering order with `priority`
- Customization Support: Enables dynamic extension of base views through modules
- Studio & QWeb Compatible: Compatible with Odoo Studio and QWeb templates

### 📄 Typical XML Definition

```XML
<record id="view_partner_form" model="ir.ui.view">
    <field name="name">res.partner.form</field>
    <field name="model">res.partner</field>
    <field name="arch" type="xml">
        <form string="Partner">
            <sheet>
                <group>
                    <field name="name"/>
                    <field name="email"/>
                </group>
            </sheet>
        </form>
    </field>
</record>
```

### 🔁 Inherited View Example

```XML
<record id="view_partner_form_inherit" model="ir.ui.view">
    <field name="name">res.partner.form.inherit.email</field>
    <field name="model">res.partner</field>
    <field name="inherit_id" ref="base.view_partner_form"/>
    <field name="arch" type="xml">
        <xpath expr="//field[@name='email']" position="after">
            <field name="website"/>
        </xpath>
    </field>
</record>
```

### 🛠️ Common Use Cases

- Defining UI: Used to create forms, lists, kanban boards, calendars, and other views
- View Inheritance: Modify existing views without overwriting original definitions
- Studio Customizations: Forms the basis of customizations in Odoo Studio
- QWeb Reporting: Used in QWeb-based templates and dashboards

### 🧠 Key Fields

| Field        | Purpose                                           |
| ------------ | ------------------------------------------------- |
| `name`       | Human-readable view name                          |
| `model`      | The model this view is related to (`res.partner`) |
| `type`       | View type (`form`, `tree`, `kanban`, etc.)        |
| `arch`       | The XML content of the view                       |
| `inherit_id` | ID of the view being inherited (if any)           |
| `priority`   | Display order for multiple views of the same type |

### 🧩 Integration Points

- With ir.actions.act_window: Views are rendered based on window actions
- With res.groups: Views can be made visible to specific user groups
- With odoo.fields: Views display fields defined in the model's Python code
