import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaveService } from '../_services/leave.service';

describe('LeaveService', () => {
  let service: LeaveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaveService],
    });
    service = TestBed.inject(LeaveService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch leaves data', () => {
    const mockLeaves = [
      {
        _id: '',
        userName: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        status: 'Pending',
        approvalDate: null,
      },
    ];

    service.getAllLeaves().subscribe((leaves) => {
      expect(leaves.length).toBe(1);
      expect(leaves[0].userName).toBe('Rakesh');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/leave/');
    expect(req.request.method).toBe('GET');
    req.flush(mockLeaves);
  });

  it('should update leave status and approval date using _id', () => {
    const mockResponse = { status: 'Approved', approvalDate: '2024-12-05' };

    service.updateLeaveStatus('1', 'Approved', '2024-12-05').subscribe((response) => {
      expect(response.status).toBe('Approved');
      expect(response.approvalDate).toBe('2024-12-05');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/leave/1/status');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      status: 'Approved',
      approvalDate: '2024-12-05',
    });
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
