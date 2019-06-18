import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const messages = {
  'en': {
    dashboardMsg: 'Dashboard',
    usermanaMsg: 'User Management',
    severityMsg: 'Severity',
    createMsg: 'Created',
    publishMsg: 'Published',
    modifyMsg: 'Modified',
    lastUpdate: 'Last updated',
    statusMsg: 'Status',
    commentMsg: 'Comment',
    action: {
      nameMsg: 'Action',
      editMsg: 'Edit',
      deleteMsg: 'Delete',
      createMsg: 'Create'
    },
    targets: {
      nameMsg: 'Name',
      hostMsg: 'Hosts',
      portMsg: 'Port List',
      targetListMsg: 'Target List',
      includedMsg: 'Included',
      max_hosts: 'Maximum Number of Hosts',
      rlOnlyMsg: 'Reverse Lookup Only',
      rlUnifyMsg: 'Reverse Lookup Unify',
      aliveTestMsg: 'Alive Test',
      tasksMsg: 'Tasks using this Target'
    },
    tasks: {
      nameMsg: 'Name',
      taskListMsg: 'Task List',
      status: 'Status',
      report: 'Reports',
      lastReport: 'Last Report',
      severity: 'Severity',
      scanTarget: 'Scan Targets',
      alert: 'Alerts',
      schedule: 'Schedule',
      addResult: 'Add results to Assets',
      apply: 'Apply Override',
      minQod: 'Min QoD',
      alterableTask: 'Alterable Task',
      delReport: {
        name: 'Auto Delete Reports',
        delReport1: 'Do not automatically delete reports',
        delReport2: 'Automatically delete oldest reports but always keep newest'
      },
      scanner: 'Scanner ',
      scanConfig: 'Scan Config',
      networkInterface: 'Network Source Interface',
      orderTarget: 'Order for target hosts',
      maxExecutedNvt: 'Maximum concurrently executed NVTs per host',
      maxScanned: 'Maximum concurrently scanned hosts',
      date: 'Date',
      vul: 'Vulnerability',
      location: 'Location'
    },
    users: {
      nameMsg: 'Name',
      roleMsg: 'Roles',
      hostAccessMsg: 'Host Access',
      authMsg: 'Authentication Type',
      passwordMsg: 'Password',
      confirmPassword: 'Confirm Password',
      allowanddeny: 'Allow all and deny',
      denyandallow: 'Deny all and allow',
      interface: 'Interface Access'
    },
    hosts: {
      hostList: 'Host List',
      nameMsg: 'Name',
      hostnameMsg: 'Hostname',
      ipMsg: 'IP Address',
      reportMsg: 'Report',
      lastestId: 'Latest Identifiers',
      value: 'Value',
      source: 'Source'
    },
    cves: {
      nameMsg: 'Name',
      vectorMsg: 'Vector',
      complexityMsg: 'Complexity',
      authenticationMsg: 'Authentication',
      confidentialityImpactMsg: 'Confidentiality Impact',
      integrityImpactMsg: 'Integrity Impact',
      availabilityImpactMsg: 'Availability Impact',
      cveListMsg: 'CVE List',
      baseScoreMsg: 'Base Score',
      descripMsg: 'Description',
      referMsg: 'References',
      vulProductMsg: 'Vulnerable Products',
      nvtAddressMsg: 'NVTs addressing this CVE'
    },
    cpes: {
      nameMsg: 'Name',
      cpeListMsg: 'CPE List',
      reportVul: 'Reported vulnerabilites',
      titleMsg: 'Title'
    },
    nvts: {
      nameMsg: 'Name',
      familyMsg: 'Family',
      qodMsg: 'Qod',
      nvtListMsg: 'NVT List',
      summaryMsg: 'Summary',
      scoring: {
        name: 'Scoring',
        base: 'CVSS Base',
        baseVector: 'CVSS Base Vector'
      },
      insightMsg: 'Insight',
      detecMsg: {
        name: 'Detection Method',
        qod: 'Quality of Detection'
      },
      affectMsg: 'Affected Software/OS',
      impactMsg: 'Impact',
      solutionMsg: 'Solution',
      solutionType: 'Solution Type',
      refer: 'References',
      otherMsg: 'Other'
    }
  },
  'vi': {
    dashboardMsg: 'Trang chủ',
    usermanaMsg: 'Quản lý người dùng',
    severityMsg: 'Mức độ rủi ro',
    createMsg: 'Ngày tạo',
    publishMsg: 'Công bố',
    modifyMsg: 'Ngày sửa đổi',
    lastUpdate: 'Cập nhật lần cuối',
    statusMsg: 'Trạng thái',
    commentMsg: 'Chú thích',
    action: {
      nameMsg: 'Hành động',
      editMsg: 'Sửa',
      deleteMsg: 'Xóa',
      createMsg: 'Tạo mới'
    },
    targets: {
      nameMsg: 'Tên',
      hostMsg: 'Hosts',
      portMsg: 'Danh sách cổng',
      targetListMsg: 'Danh sách target',
      includedMsg: 'Included',
      max_hosts: 'Số lượng host tối đa',
      rlOnlyMsg: 'Chỉ tra cứu ngược',
      rlUnifyMsg: 'Hợp nhất tra cứu ngược',
      aliveTestMsg: 'Kiểm tra trạng thái',
      tasksMsg: 'Các tác vụ sử dụng target'
    },
    tasks: {
      nameMsg: 'Tên',
      taskListMsg: 'Danh sách tác vụ',
      status: 'Trạng thái',
      report: 'Báo cáo',
      lastReport: 'Báo cáo cuối cùng',
      severity: 'Mức độ rủi ro',
      scanTarget: 'Đích quét',
      alert: 'Cảnh báo',
      schedule: 'Lịch quét',
      addResult: 'Thêm kết quả vào tài sản',
      apply: 'Áp dụng ghi đè',
      minQod: 'Chất lượng phát hiện nhỏ nhất',
      alterableTask: 'Cho phép sửa đổi',
      delReport: {
        name: 'Tự động xóa báo cáo',
        delReport1: 'Không tự động xóa báo cáo',
        delReport2: 'Tự động xóa các báo cáo cũ nhất nhưng luôn giữ'
      },
      scanner: 'Bộ dò quét',
      scanConfig: 'Cấu hình quét',
      networkInterface: 'Giao diện thiết bị mạng',
      orderTarget: 'Thứ tự thi hành',
      maxExecutedNvt: 'Số luồng dò quét đồng thời tối đa cho mỗi hệ thống',
      maxScanned: 'Số lượng hệ thống được dò quét đồng thời tối đa',
      date: 'Ngày',
      vul: 'Lỗ hổng',
      location: 'Giao thức'
    },
    users: {
      nameMsg: 'Tên',
      roleMsg: 'Quyền',
      hostAccessMsg: 'Truy cập máy chủ',
      authMsg: 'Loại xác thực',
      passwordMsg: 'Mật khẩu',
      confirmPassword: 'Xác nhận mật khẩu',
      allowanddeny: 'Cho phép tất cả và từ chối',
      denyandallow: 'Từ chối tất cả và cho phép',
      interface: 'Giao diện truy cập'
    },
    hosts: {
      hostList: 'Danh sách Host',
      nameMsg: 'Tên',
      hostnameMsg: 'Tên hệ thống',
      ipMsg: 'Địa chỉ IP',
      reportMsg: 'Báo cáo',
      lastestId: 'Thông tin dò quét hệ thống',
      value: 'Giá trị',
      source: 'Nguồn báo cáo'
    },
    cves: {
      nameMsg: 'Tên',
      vectorMsg: 'Vector',
      complexityMsg: 'Complexity',
      authenticationMsg: 'Authentication',
      confidentialityImpactMsg: 'Confidentiality Impact',
      integrityImpactMsg: 'Integrity Impact',
      availabilityImpactMsg: 'Availability Impact',
      cveListMsg: 'Danh sách CVE',
      baseScoreMsg: 'Base Score',
      descripMsg: 'Mô tả',
      vulProductMsg: 'Các hệ thống bị ảnh hưởng',
      referMsg: 'Tài liệu tham khảo',
      nvtAddressMsg: 'Mẫu NVT dành cho CVE'
    },
    cpes: {
      nameMsg: 'Tên',
      cpeListMsg: 'Danh sách CPE',
      reportVul: 'Báo cáo lỗ hổng',
      titleMsg: 'Tiêu đề'
    },
    nvts: {
      nameMsg: 'Tên',
      familyMsg: 'Nhóm',
      qodMsg: 'Qod',
      nvtListMsg: 'Danh sách NVT',
      summaryMsg: 'Tóm tắt',
      scoring: {
        name: 'Trọng số đánh giá',
        base: 'CVSS Base',
        baseVector: 'CVSS Base Vector'
      },
      insightMsg: 'Mô tả',
      detecMsg: {
        name: 'Phương pháp phát hiện',
        qod: 'Chất lượng phát hiện'
      },
      affectMsg: 'Hệ thống bị ảnh hưởng',
      impactMsg: 'Tác động',
      solutionMsg: 'Giải pháp',
      solutionType: 'Loại giải pháp',
      refer: 'Tài liệu tham khảo',
      otherMsg: 'Khác'
    }
  }
}

const i18n = new VueI18n({
  locale: 'vi', // set locale
  fallbackLocale: 'vi', // set fallback locale
  messages // set locale messages
})

export default i18n
